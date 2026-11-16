import React, { useState, useMemo } from 'react'
import { useSEO, breadcrumbSchema } from '../hooks/useSEO.js'
import PageHero from '../components/ui/PageHero.jsx'
import LeadForm from '../components/ui/LeadForm.jsx'
import PropertyCard from '../components/ui/PropertyCard.jsx'
import { getFeatured } from '../data/properties.js'
import { formatUF } from '../utils/format.js'
import { trackEvent, AnalyticsEvents } from '../utils/analytics.js'

const UF_VALUE = 38000 // Valor UF aproximado en CLP
const ANNUAL_TAX_RATE = 0.012 // Contribuciones aprox 1.2% anual del avalúo
const VACANCY_RATE_DEFAULT = 0.05 // 5% vacancia
const MAINTENANCE_RATE = 0.01 // 1% mantenimiento anual

// Calculadora de inversión real mejorada
function InvestmentCalculator() {
  const [inputs, setInputs] = useState({
    priceUF: 8500,
    downPaymentPercent: 30,
    interestRate: 4.5,
    loanTermYears: 20,
    expensesUF: 1.2,
    projectedRentUF: 44,
    vacancyRate: 5, // %
    includeTaxes: true,
    includeMaintenance: true,
  })

  const [activeTab, setActiveTab] = useState('resumen')

  const results = useMemo(() => {
    const priceCLP = inputs.priceUF * UF_VALUE
    const downPaymentCLP = priceCLP * (inputs.downPaymentPercent / 100)
    const loanAmountCLP = priceCLP - downPaymentCLP
    const monthlyRate = inputs.interestRate / 100 / 12
    const numPayments = inputs.loanTermYears * 12

    // Dividendo mensual (cuota hipotecaria)
    let monthlyPaymentCLP = 0
    if (monthlyRate > 0 && numPayments > 0) {
      monthlyPaymentCLP = loanAmountCLP * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    }

    const monthlyPaymentUF = monthlyPaymentCLP / UF_VALUE
    const expensesUF = inputs.expensesUF || 0
    
    // Vacancia
    const vacancyUF = inputs.projectedRentUF * (inputs.vacancyRate / 100)
    
    // Contribuciones (impuestos)
    const annualTaxCLP = inputs.includeTaxes ? priceCLP * ANNUAL_TAX_RATE : 0
    const monthlyTaxUF = annualTaxCLP / 12 / UF_VALUE
    
    // Mantenimiento
    const annualMaintenanceCLP = inputs.includeMaintenance ? priceCLP * MAINTENANCE_RATE : 0
    const monthlyMaintenanceUF = annualMaintenanceCLP / 12 / UF_VALUE

    const totalMonthlyCostUF = monthlyPaymentUF + expensesUF + monthlyTaxUF + monthlyMaintenanceUF
    const effectiveRentUF = inputs.projectedRentUF - vacancyUF
    const monthlyCashFlowUF = effectiveRentUF - totalMonthlyCostUF
    const monthlyCashFlowCLP = monthlyCashFlowUF * UF_VALUE

    // Cap Rate = (Arriendo anual efectivo - Gastos operativos) / Precio
    const annualEffectiveRentCLP = effectiveRentUF * 12 * UF_VALUE
    const annualOpExCLP = (expensesUF + monthlyTaxUF + monthlyMaintenanceUF) * 12 * UF_VALUE
    const noiCLP = annualEffectiveRentCLP - annualOpExCLP
    const capRate = priceCLP > 0 ? (noiCLP / priceCLP) * 100 : 0

    // ROE Año 1 = Flujo neto anual / Pie
    const annualCashFlowCLP = monthlyCashFlowCLP * 12
    const roeYear1 = downPaymentCLP > 0 ? (annualCashFlowCLP / downPaymentCLP) * 100 : 0

    // Amortización primer año
    const firstYearInterestCLP = loanAmountCLP * (inputs.interestRate / 100)
    const firstYearPrincipalCLP = monthlyPaymentCLP * 12 - firstYearInterestCLP
    const totalReturnYear1 = annualCashFlowCLP + firstYearPrincipalCLP
    const totalROEYear1 = downPaymentCLP > 0 ? (totalReturnYear1 / downPaymentCLP) * 100 : 0

    // Tabla de amortización (primeros 5 años + año final)
    const amortizationSchedule = []
    let remainingBalance = loanAmountCLP
    for (let year = 1; year <= inputs.loanTermYears; year++) {
      let yearInterest = 0
      let yearPrincipal = 0
      for (let month = 0; month < 12; month++) {
        if (remainingBalance <= 0) break
        const monthInterest = remainingBalance * monthlyRate
        const monthPrincipal = monthlyPaymentCLP - monthInterest
        yearInterest += monthInterest
        yearPrincipal += monthPrincipal
        remainingBalance = Math.max(0, remainingBalance - monthPrincipal)
      }
      if (year <= 5 || year === inputs.loanTermYears || year % 5 === 0) {
        amortizationSchedule.push({
          year,
          interest: Math.round(yearInterest),
          principal: Math.round(yearPrincipal),
          balance: Math.round(remainingBalance),
        })
      }
    }

    return {
      priceCLP,
      downPaymentCLP,
      loanAmountCLP,
      monthlyPaymentUF: Math.round(monthlyPaymentUF * 100) / 100,
      monthlyPaymentCLP: Math.round(monthlyPaymentCLP),
      expensesUF,
      monthlyTaxUF: Math.round(monthlyTaxUF * 100) / 100,
      monthlyMaintenanceUF: Math.round(monthlyMaintenanceUF * 100) / 100,
      vacancyUF: Math.round(vacancyUF * 100) / 100,
      effectiveRentUF: Math.round(effectiveRentUF * 100) / 100,
      totalMonthlyCostUF: Math.round(totalMonthlyCostUF * 100) / 100,
      monthlyCashFlowUF: Math.round(monthlyCashFlowUF * 100) / 100,
      monthlyCashFlowCLP: Math.round(monthlyCashFlowCLP),
      capRate: Math.round(capRate * 100) / 100,
      roeYear1: Math.round(roeYear1 * 100) / 100,
      totalROEYear1: Math.round(totalROEYear1 * 100) / 100,
      annualCashFlowCLP: Math.round(annualCashFlowCLP),
      firstYearPrincipalCLP: Math.round(firstYearPrincipalCLP),
      annualTaxCLP: Math.round(annualTaxCLP),
      annualMaintenanceCLP: Math.round(annualMaintenanceCLP),
      amortizationSchedule,
      noiCLP: Math.round(noiCLP),
    }
  }, [inputs])

  const handleChange = (e) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setInputs(prev => ({ ...prev, [name]: e.target.checked }))
    } else {
      const numValue = type === 'number' ? parseFloat(value) || 0 : value
      setInputs(prev => ({ ...prev, [name]: numValue }))
    }
  }

  const formatCLP = (val) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(val)
  const formatUF = (val) => `${val.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} UF`

  const cashFlowClass = results.monthlyCashFlowUF > 0 ? 'positive' : results.monthlyCashFlowUF < 0 ? 'negative' : 'neutral'

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    trackEvent('calculator_tab_change', { tab })
  }

  return (
    <div className="investment-calculator" data-reveal>
      <div className="calc-header">
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>Calculadora de Inversión Avanzada</h3>
        <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Incluye vacancia, contribuciones, mantenimiento y tabla de amortización. Ajusta los parámetros y ve los resultados en tiempo real.
        </p>
        
        <div className="calc-tabs" role="tablist">
          {[
            { id: 'resumen', label: 'Resumen' },
            { id: 'flujo', label: 'Flujo de Caja' },
            { id: 'amortizacion', label: 'Amortización' },
            { id: 'metricas', label: 'Métricas Clave' },
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`calc-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="calc-grid">
        {/* INPUTS */}
        <div className="calc-inputs">
          <fieldset className="calc-section">
            <legend>Compra y Financiamiento</legend>
            <div className="calc-group">
              <label>
                <span>Precio propiedad (UF)</span>
                <input
                  type="number"
                  name="priceUF"
                  value={inputs.priceUF}
                  onChange={handleChange}
                  min="1000"
                  max="100000"
                  step="100"
                />
              </label>
            </div>
            <div className="calc-group">
              <label>
                <span>Pie (%)</span>
                <input
                  type="number"
                  name="downPaymentPercent"
                  value={inputs.downPaymentPercent}
                  onChange={handleChange}
                  min="10"
                  max="100"
                  step="5"
                />
              </label>
            </div>
            <div className="calc-group">
              <label>
                <span>Tasa interés anual (%)</span>
                <input
                  type="number"
                  name="interestRate"
                  value={inputs.interestRate}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  step="0.1"
                />
              </label>
            </div>
            <div className="calc-group">
              <label>
                <span>Plazo crédito (años)</span>
                <input
                  type="number"
                  name="loanTermYears"
                  value={inputs.loanTermYears}
                  onChange={handleChange}
                  min="5"
                  max="30"
                  step="1"
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="calc-section">
            <legend>Ingresos y Gastos Operativos</legend>
            <div className="calc-group">
              <label>
                <span>Arriendo proyectado (UF/mes)</span>
                <input
                  type="number"
                  name="projectedRentUF"
                  value={inputs.projectedRentUF}
                  onChange={handleChange}
                  min="0"
                  max="500"
                  step="1"
                />
              </label>
            </div>
            <div className="calc-group">
              <label>
                <span>Gastos comunes (UF/mes)</span>
                <input
                  type="number"
                  name="expensesUF"
                  value={inputs.expensesUF}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  step="0.1"
                />
              </label>
            </div>
            <div className="calc-group">
              <label>
                <span>Vacancia estimada (%)</span>
                <input
                  type="number"
                  name="vacancyRate"
                  value={inputs.vacancyRate}
                  onChange={handleChange}
                  min="0"
                  max="30"
                  step="0.5"
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="calc-section">
            <legend>Costos Adicionales (Opcionales)</legend>
            <div className="calc-group checkbox-row">
              <label>
                <input
                  type="checkbox"
                  name="includeTaxes"
                  checked={inputs.includeTaxes}
                  onChange={handleChange}
                />
                <span>Incluir contribuciones (1.2% anual avalúo)</span>
              </label>
            </div>
            <div className="calc-group checkbox-row">
              <label>
                <input
                  type="checkbox"
                  name="includeMaintenance"
                  checked={inputs.includeMaintenance}
                  onChange={handleChange}
                />
                <span>Incluir mantenimiento (1% anual avalúo)</span>
              </label>
            </div>
          </fieldset>

          <button 
            type="button"
            className="btn btn--primary calc-track-btn"
            onClick={() => {
              trackEvent(AnalyticsEvents.calculator_use(inputs))
              trackEvent(AnalyticsEvents.calculator_result_view(results))
            }}
          >
            Calcular y Registrar Evento
          </button>
        </div>

        {/* RESULTS */}
        <div className="calc-results">
          {activeTab === 'resumen' && (
            <>
              <div className="result-card highlight">
                <div className="result-label">Cap Rate Neto</div>
                <div className="result-value gold">{results.capRate}%</div>
                <div className="result-desc">NOI / Precio (con vacancia y gastos)</div>
              </div>

              <div className="result-card">
                <div className="result-label">ROE Año 1 (Flujo)</div>
                <div className="result-value gold">{results.roeYear1}%</div>
                <div className="result-desc">Flujo neto anual / Pie</div>
              </div>

              <div className="result-card">
                <div className="result-label">ROE Total Año 1</div>
                <div className="result-value gold">{results.totalROEYear1}%</div>
                <div className="result-desc">Flujo + Amortización capital</div>
              </div>

              <div className={`result-card highlight ${cashFlowClass}`}>
                <div className="result-label">Flujo Caja Mensual</div>
                <div className="result-value">{results.monthlyCashFlowUF >= 0 ? '+' : ''}{formatUF(results.monthlyCashFlowUF)}</div>
                <div className="result-desc">{results.monthlyCashFlowUF > 0 ? 'Superávit' : results.monthlyCashFlowUF < 0 ? 'Déficit' : 'Equilibrio'}</div>
              </div>

              <div className="result-card">
                <div className="result-label">Arriendo Efectivo</div>
                <div className="result-value gold">{formatUF(results.effectiveRentUF)}</div>
                <div className="result-desc">Proyectado menos vacancia ({inputs.vacancyRate}%)</div>
              </div>

              <div className="result-card">
                <div className="result-label">Costo Total Mensual</div>
                <div className="result-value">{formatUF(results.totalMonthlyCostUF)}</div>
                <div className="result-desc">Dividendo + GC + Impuestos + Mantenimiento</div>
              </div>
            </>
          )}

          {activeTab === 'flujo' && (
            <>
              <div className="result-card summary">
                <div className="result-label">Desglose Mensual (UF)</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Arriendo Proyectado:</span> <b>{formatUF(inputs.projectedRentUF)}</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-mute)' }}><span>  Menos Vacancia ({inputs.vacancyRate}%):</span> <b>−{formatUF(results.vacancyUF)}</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span><b>Arriendo Efectivo:</b></span> <b>{formatUF(results.effectiveRentUF)}</b></div>
                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: '0.5rem', marginTop: '0.5rem' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Dividendo:</span> <b>{formatUF(results.monthlyPaymentUF)}</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Gastos Comunes:</span> <b>{formatUF(inputs.expensesUF)}</b></div>
                  {inputs.includeTaxes && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Contribuciones:</span> <b>{formatUF(results.monthlyTaxUF)}</b></div>}
                  {inputs.includeMaintenance && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Mantenimiento:</span> <b>{formatUF(results.monthlyMaintenanceUF)}</b></div>}
                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: '0.5rem', marginTop: '0.5rem' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}><span>Costo Total:</span> <b>{formatUF(results.totalMonthlyCostUF)}</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1rem', color: results.monthlyCashFlowUF > 0 ? '#2e7d32' : results.monthlyCashFlowUF < 0 ? '#c62828' : 'var(--ink)' }}><span>Flujo Neto:</span> <b>{results.monthlyCashFlowUF >= 0 ? '+' : ''}{formatUF(results.monthlyCashFlowUF)}</b></div>
                </div>
              </div>

              <div className="result-card summary">
                <div className="result-label">Resumen Anual (CLP)</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Ingresos Arriendo:</span> <b>{formatCLP(inputs.projectedRentUF * 12 * UF_VALUE)}</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-mute)' }}><span>  Menos Vacancia:</span> <b>−{formatCLP(results.vacancyUF * 12 * UF_VALUE)}</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span><b>Ingresos Efectivos:</b></span> <b>{formatCLP(results.effectiveRentUF * 12 * UF_VALUE)}</b></div>
                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: '0.5rem', marginTop: '0.5rem' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Dividendos:</span> <b>{formatCLP(results.monthlyPaymentCLP * 12)}</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Gastos Comunes:</span> <b>{formatCLP(inputs.expensesUF * 12 * UF_VALUE)}</b></div>
                  {inputs.includeTaxes && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Contribuciones:</span> <b>{formatCLP(results.annualTaxCLP)}</b></div>}
                  {inputs.includeMaintenance && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Mantenimiento:</span> <b>{formatCLP(results.annualMaintenanceCLP)}</b></div>}
                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: '0.5rem', marginTop: '0.5rem' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}><span>Egresos Totales:</span> <b>{formatCLP((results.totalMonthlyCostUF - results.monthlyPaymentUF + results.monthlyPaymentUF) * 12 * UF_VALUE)}</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1rem' }}><span>Flujo Neto Anual:</span> <b>{formatCLP(results.annualCashFlowCLP)}</b></div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'amortizacion' && (
            <div className="result-card summary" style={{ gridColumn: '1 / -1' }}>
              <div className="result-label">Tabla de Amortización (Hititos)</div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--line)', textAlign: 'left' }}>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Año</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Interés</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Capital</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Saldo</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>% Pagado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.amortizationSchedule.map((row, i) => (
                      <tr key={row.year} style={{ borderBottom: '1px solid var(--line)', background: i % 2 === 0 ? 'var(--cream)' : 'transparent' }}>
                        <td style={{ padding: '0.6rem 0.5rem', fontWeight: '600' }}>{row.year}</td>
                        <td style={{ padding: '0.6rem 0.5rem' }}>{formatCLP(row.interest)}</td>
                        <td style={{ padding: '0.6rem 0.5rem' }}>{formatCLP(row.principal)}</td>
                        <td style={{ padding: '0.6rem 0.5rem' }}>{formatCLP(row.balance)}</td>
                        <td style={{ padding: '0.6rem 0.5rem', color: 'var(--gold)', fontWeight: '600' }}>
                          {results.loanAmountCLP > 0 ? Math.round(((results.loanAmountCLP - row.balance) / results.loanAmountCLP) * 100) : 0}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--ink-mute)' }}>
                Se muestran años 1-5, cada 5 años y el año final. Interés y capital en CLP.
              </p>
            </div>
          )}

          {activeTab === 'metricas' && (
            <>
              <div className="result-card highlight">
                <div className="result-label">NOI Anual</div>
                <div className="result-value gold">{formatCLP(results.noiCLP)}</div>
                <div className="result-desc">Ingresos operativos netos</div>
              </div>

              <div className="result-card">
                <div className="result-label">Punto de Equilibrio</div>
                <div className="result-value gold">{results.monthlyCashFlowUF >= 0 ? 'Mes 1' : `N/A (déficit ${formatUF(Math.abs(results.monthlyCashFlowUF))})`}</div>
                <div className="result-desc">Cuándo flujo caja se vuelve positivo</div>
              </div>

              <div className="result-card">
                <div className="result-label">DSCR (Cobertura Deuda)</div>
                <div className="result-value gold">
                  {results.monthlyPaymentUF > 0 
                    ? (results.effectiveRentUF / results.monthlyPaymentUF).toFixed(2) + 'x'
                    : 'N/A'
                  }
                </div>
                <div className="result-desc">Arriendo efectivo / Dividendo (objetivo {'>'} 1.25x)</div>
              </div>

              <div className="result-card">
                <div className="result-label">LTV (Loan to Value)</div>
                <div className="result-value gold">{(100 - inputs.downPaymentPercent)}%</div>
                <div className="result-desc">Préstamo / Valor propiedad</div>
              </div>

              <div className="result-card">
                <div className="result-label">Payback Period</div>
                <div className="result-value gold">
                  {results.annualCashFlowCLP > 0 
                    ? (results.downPaymentCLP / results.annualCashFlowCLP).toFixed(1) + ' años'
                    : 'N/A (flujo negativo)'
                  }
                </div>
                <div className="result-desc">Años para recuperar el pie solo con flujo</div>
              </div>

              <div className="result-card">
                <div className="result-label">IRR Estimado (5 años)</div>
                <div className="result-value gold">
                  {/* IRR aproximado: asumimos venta al mismo precio + flujo acumulado + amortización */}
                  {
                    (() => {
                      const salePrice = results.priceCLP
                      const totalCashIn5Years = results.annualCashFlowCLP * 5 + results.firstYearPrincipalCLP * 5
                      const irrApprox = Math.pow((results.downPaymentCLP + totalCashIn5Years) / results.downPaymentCLP, 1/5) - 1
                      return (irrApprox * 100).toFixed(1) + '%'
                    })()
                  }
                </div>
                <div className="result-desc">Tasa interna retorno a 5 años (aprox.)</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Inversion() {
  useSEO({
    title: 'Asesoría de Inversión Inmobiliaria | Calculadora Avanzada',
    description: 'Calculadora de inversión interactiva con vacancia, contribuciones, mantenimiento y amortización. Análisis de Cap Rate, flujo de caja, ROE, DSCR e IRR. Oportunidades curadas para inversionistas.',
    path: '/inversion',
    jsonLd: breadcrumbSchema([
      { label: 'Inicio', path: '/' },
      { label: 'Inversión', path: '/inversion' },
    ]),
  })

  const crumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Inversión', href: '/inversion' },
  ]

  const featuredProps = getFeatured()

  const marketInsights = [
    { metric: 'Cap Rate Promedio Las Condes', value: '5.8%', trend: 'stable' },
    { metric: 'Cap Rate Promedio Providencia', value: '6.2%', trend: 'up' },
    { metric: 'Vacancia Residencial Santiago', value: '3.2%', trend: 'down' },
    { metric: 'Plusvalía Anual Promedio (5 años)', value: '4.1%', trend: 'up' },
    { metric: 'Tasa Hipotecaria Promedio (UF)', value: '4.3%', trend: 'stable' },
    { metric: 'Crecimiento Arriendos (YoY)', value: '8.5%', trend: 'up' },
  ]

  return (
    <>
      <PageHero
        eyebrow="Para Inversionistas"
        title="Invierte con Números, No con Intuición"
        lead="Calculadora interactiva avanzada, cartera curada y datos de mercado reales. Cada oportunidad se evalúa con criterio patrimonial antes de recomendarla."
        crumbs={crumbs}
      />

      {/* CALCULADORA INTERACTIVA AVANZADA */}
      <section className="calculator-section" style={{ padding: 'var(--section-pad) 0', background: 'var(--cream)', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <InvestmentCalculator />
        </div>
      </section>

      {/* PORTFOLIO / OPORTUNIDADES */}
      <section className="portfolio-section" style={{ padding: 'var(--section-pad) 0' }}>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Oportunidades Actuales</span>
            <h2 className="section-title">Cartera curada con métricas verificadas</h2>
          </div>

          <div className="props-grid">
            {featuredProps.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="/propiedades" className="btn btn--outline">
              Ver todas las oportunidades
            </a>
          </div>
        </div>
      </section>

      {/* INSIGHTS DE MERCADO */}
      <section className="insights-section" style={{ padding: 'var(--section-pad) 0', background: 'var(--cream)', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Inteligencia de Mercado</span>
            <h2 className="section-title">Datos que respaldan tus decisiones</h2>
          </div>

          <div className="insights__grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {marketInsights.map((insight, i) => (
              <div key={insight.metric} className="insight-card" data-reveal style={{ '--reveal-delay': `${i * 80}ms` }}>
                <span className="insight-card__cat">{insight.trend === 'up' ? '📈' : insight.trend === 'down' ? '📉' : '➡️'} Tendencia</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '0.3rem' }}>{insight.value}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', margin: 0 }}>{insight.metric}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD FORM INVERSIÓN */}
      <section className="lead-split">
        <div className="container">
          <div className="lead-split__grid">
            <div className="lead-split__content" data-reveal>
              <span className="eyebrow">Evalúa tu próxima inversión</span>
              <h2 className="section-title" style={{ marginTop: '1.4rem' }}>
                Cuéntanos qué buscas
              </h2>
              <p className="lead">
                Analizamos tu objetivo y te presentamos oportunidades que
                realmente cumplan tus criterios de rentabilidad y riesgo.
              </p>
            </div>
            <div className="lead-split__form" data-reveal style={{ '--reveal-delay': '150ms' }}>
              <LeadForm
                intent="invertir-propiedades"
                source="/inversion"
                fields={[
                  { name: 'name', label: 'Nombre', type: 'text', required: true },
                  { name: 'email', label: 'Email', type: 'email', required: true },
                  { name: 'phone', label: 'Teléfono', type: 'tel', required: true },
                  { name: 'montoInversion', label: 'Monto de inversión (CLP)', type: 'number', placeholder: '100000000', required: true },
                  { name: 'ciudades', label: 'Ciudades de interés', type: 'multiselect', required: true, options: ['Santiago', 'Viña del Mar', 'Valparaíso', 'Concepción', 'Otras'] },
                  { name: 'tiposPropiedad', label: 'Tipos de propiedad', type: 'checkbox', required: true, options: ['Departamento', 'Casa', 'Comercial', 'Terreno', 'Bodegas'] },
                  { name: 'perfil', label: 'Perfil inversor', type: 'select', required: false, options: ['Primer inversionista', 'Inversionista patrimonial', 'Vendedor ocasional'] },
                ]}
                submitLabel="Evaluar mi inversión"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}









