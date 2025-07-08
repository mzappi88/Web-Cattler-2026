"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Check } from "lucide-react"
import { Calendar, CalendarDays } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface Plan {
  id: string
  name: string
  price: number
  annualPrice?: number
  description: string
  pens: string
  users: string
  keyFeatures: string[]
  popular: boolean
  billingCycle?: "monthly" | "annual"
  planType?: "owner" | "custom"
  promotionalState?: any
}

interface AddOn {
  id: string
  name: string
  description: string
  price: number
  availableFor: string[]
  includedIn?: string[]
  isBoitel?: boolean
}

interface CheckoutProps {
  selectedPlan: Plan
  onBack: () => void
}

// Move constants outside component to prevent recreation
const PEN_PRICE = 30
const USER_PRICE = 120

const ADD_ONS = [
  {
    id: "boitel-addon",
    name: "Módulo Boitel",
    description: "Gestão completa para operações de Boitel com múltiplos clientes",
    price: 600,
    availableFor: ["lite", "go", "flex", "pro"],
    includedIn: [],
    isBoitel: true,
  },
  {
    id: "usuarios-clientes",
    name: "Usuários de Clientes",
    description: "Usuários adicionais para clientes específicos",
    price: 120,
    availableFor: ["lite", "go", "flex", "pro"],
    includedIn: [],
    isBoitel: true,
  },
  {
    id: "sanidade-animal",
    name: "Sanidade Animal",
    description: "Gestão completa da saúde do rebanho",
    price: 400,
    availableFor: ["lite", "go", "flex"],
    includedIn: ["pro"],
  },
  {
    id: "tronco",
    name: "Tronco",
    description: "Sistema completo de manejo no tronco",
    price: 300,
    availableFor: ["go"],
    includedIn: ["flex", "pro"],
  },
  {
    id: "leitor-brinco",
    name: "Integração com Leitor de Brinco",
    description: "Integração com sistemas de leitura de brincos eletrônicos",
    price: 300,
    availableFor: ["go"],
    includedIn: ["flex", "pro"],
  },
  {
    id: "alimentacao-avancada",
    name: "Alimentação Avançada",
    description: "Recursos avançados para gestão e otimização de alimentação",
    price: 600,
    availableFor: ["lite"],
    includedIn: ["go", "flex", "pro"],
  },
  {
    id: "pre-misturas",
    name: "Geração de Pré-misturas",
    description: "Sistema para geração e controle de pré-misturas",
    price: 150,
    availableFor: ["lite", "go"],
    includedIn: ["flex", "pro"],
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Análises avançadas e relatórios detalhados para otimização da operação",
    price: 300,
    availableFor: ["go", "flex"],
    includedIn: ["pro"],
  },
  {
    id: "relatorio-mercado",
    name: "Relatório de Valor de Mercado",
    description: "Relatórios detalhados sobre valores de mercado do gado",
    price: 150,
    availableFor: ["go", "flex"],
    includedIn: ["pro"],
  },
]

export default function Checkout({ selectedPlan, onBack }: CheckoutProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  })
  const [additionalPens, setAdditionalPens] = useState(0)
  const [additionalUsers, setAdditionalUsers] = useState(0)
  const [additionalClientUsers, setAdditionalClientUsers] = useState(0)
  const [billingCycle, setBillingCycleState] = useState<"monthly" | "annual">(selectedPlan.billingCycle || "monthly")
  const router = useRouter()

  const planType = selectedPlan.planType || "owner"

  // Load saved checkout data when component mounts
  useEffect(() => {
    try {
      const savedCheckoutData = localStorage.getItem(`checkoutData_${selectedPlan.id}`)
      if (savedCheckoutData) {
        const data = JSON.parse(savedCheckoutData)
        setSelectedAddOns(data.selectedAddOns || [])
        setAdditionalPens(data.additionalPens || 0)
        setAdditionalUsers(data.additionalUsers || 0)
        setAdditionalClientUsers(data.additionalClientUsers || 0)
        setCustomerInfo(
          data.customerInfo || {
            name: "",
            email: "",
            company: "",
            phone: "",
          },
        )
      }
    } catch (error) {
      console.error("Error loading saved checkout data:", error)
    }
  }, [selectedPlan.id])

  // Save checkout data whenever it changes
  useEffect(() => {
    try {
      const checkoutData = {
        selectedAddOns,
        additionalPens,
        additionalUsers,
        additionalClientUsers,
        customerInfo,
        timestamp: Date.now(),
      }
      localStorage.setItem(`checkoutData_${selectedPlan.id}`, JSON.stringify(checkoutData))
    } catch (error) {
      console.error("Error saving checkout data:", error)
    }
  }, [selectedAddOns, additionalPens, additionalUsers, additionalClientUsers, customerInfo, selectedPlan.id])

  // Cleanup old data (older than 1 hour)
  useEffect(() => {
    try {
      const keys = Object.keys(localStorage)
      const oneHour = 60 * 60 * 1000
      const now = Date.now()

      keys.forEach((key) => {
        if (key.startsWith("checkoutData_")) {
          try {
            const data = JSON.parse(localStorage.getItem(key) || "{}")
            if (data.timestamp && now - data.timestamp > oneHour) {
              localStorage.removeItem(key)
            }
          } catch (error) {
            localStorage.removeItem(key)
          }
        }
      })
    } catch (error) {
      console.error("Error cleaning up old data:", error)
    }
  }, [])

  const availableAddOns = useMemo(
    () =>
      ADD_ONS.filter(
        (addon) =>
          addon.availableFor.includes(selectedPlan.id) &&
          (!addon.includedIn || !addon.includedIn.includes(selectedPlan.id)),
      ),
    [selectedPlan.id],
  )

  const includedAddOns = useMemo(
    () => ADD_ONS.filter((addon) => addon.includedIn?.includes(selectedPlan.id)),
    [selectedPlan.id],
  )

  const handleAddOnToggle = useCallback((addOnId: string) => {
    setSelectedAddOns((prev) => {
      if (prev.includes(addOnId)) {
        if (addOnId === "usuarios-clientes") {
          setAdditionalClientUsers(0)
        }
        return prev.filter((id) => id !== addOnId)
      } else {
        if (addOnId === "usuarios-clientes") {
          setAdditionalClientUsers(1)
        }
        return [...prev, addOnId]
      }
    })
  }, [])

  const handleInputChange = useCallback((field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }, [])

  const calculateTotal = useMemo(() => {
    const baseMonthlyPrice = selectedPlan.price
    const basePrice = billingCycle === "annual" ? Math.round(baseMonthlyPrice * 12 * 0.9) : baseMonthlyPrice

    const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = ADD_ONS.find((a) => a.id === addOnId)
      if (!addOn) return total

      const addonMonthlyPrice = addOn.price
      let addonPrice = billingCycle === "annual" ? Math.round(addonMonthlyPrice * 12 * 0.9) : addonMonthlyPrice

      if (addOn.id === "usuarios-clientes" && additionalClientUsers > 0) {
        addonPrice = addonPrice * additionalClientUsers
      }

      return total + addonPrice
    }, 0)

    const pensMonthlyTotal = additionalPens * PEN_PRICE
    const usersMonthlyTotal = additionalUsers * USER_PRICE

    const pensTotal = billingCycle === "annual" ? Math.round(pensMonthlyTotal * 12 * 0.9) : pensMonthlyTotal
    const usersTotal = billingCycle === "annual" ? Math.round(usersMonthlyTotal * 12 * 0.9) : usersMonthlyTotal

    return basePrice + addOnTotal + pensTotal + usersTotal
  }, [billingCycle, selectedPlan.price, selectedAddOns, additionalPens, additionalUsers, additionalClientUsers])

  const isFormValid = useMemo(() => {
    return customerInfo.name && customerInfo.email && customerInfo.company
  }, [customerInfo])

  const formatPrice = useCallback(
    (price: number) => {
      if (billingCycle === "annual") {
        return `R$ ${price} / ano`
      }
      return `R$ ${price} / mês`
    },
    [billingCycle],
  )

  const handleStartTrial = useCallback(() => {
    try {
      const paymentData = {
        plan: selectedPlan,
        addOns: selectedAddOns,
        customerInfo,
        total: calculateTotal,
        billingCycle: billingCycle,
        planType: selectedPlan.planType || "owner",
        additionalPens,
        additionalUsers,
        additionalClientUsers,
      }

      localStorage.setItem("paymentData", JSON.stringify(paymentData))
      localStorage.removeItem(`checkoutData_${selectedPlan.id}`)
      router.push("/pricing/payment")
    } catch (error) {
      console.error("Error saving payment data:", error)
    }
  }, [
    selectedPlan,
    selectedAddOns,
    customerInfo,
    calculateTotal,
    additionalPens,
    additionalUsers,
    additionalClientUsers,
    billingCycle,
    router,
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-cattler-navy hover:text-cattler-green font-lato"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Planos
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold font-barlow text-cattler-navy">Complete Seu Pedido</h1>
          <p className="text-lg font-lato text-cattler-navy/80 mt-2">
            Personalize seu plano {selectedPlan.name} com recursos adicionais
          </p>
          <div className="mt-2 flex items-center">
            <Badge className="bg-cattler-teal text-white">{planType === "owner" ? "Proprietário" : "Boitel"}</Badge>
            <Badge className="ml-2 bg-cattler-navy text-white">Etapa 1 de 3</Badge>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border-2 border-cattler-teal/30">
              <div className="flex items-center gap-2">
                <Calendar
                  className={`h-5 w-5 ${billingCycle === "monthly" ? "text-cattler-green" : "text-gray-400"}`}
                />
                <span
                  className={`font-lato ${billingCycle === "monthly" ? "font-bold text-cattler-navy" : "text-gray-500"}`}
                >
                  Mensal
                </span>
              </div>
              <Switch
                checked={billingCycle === "annual"}
                onCheckedChange={(checked) => setBillingCycleState(checked ? "annual" : "monthly")}
              />
              <div className="flex items-center gap-2">
                <CalendarDays
                  className={`h-5 w-5 ${billingCycle === "annual" ? "text-cattler-green" : "text-gray-400"}`}
                />
                <span
                  className={`font-lato ${billingCycle === "annual" ? "font-bold text-cattler-navy" : "text-gray-500"}`}
                >
                  Anual (10% de desconto)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Plan Details & Add-ons */}
          <div className="space-y-6">
            {/* Selected Plan */}
            <Card className="bg-white border-2 border-cattler-green">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-barlow text-cattler-navy">{selectedPlan.name}</CardTitle>
                    <CardDescription className="font-roboto text-cattler-navy/70">
                      {selectedPlan.description}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold font-barlow text-cattler-green">
                      {billingCycle === "monthly"
                        ? `R$ ${selectedPlan.price}`
                        : `R$ ${Math.round(selectedPlan.price * 0.9)}`}
                    </div>
                    <div className="text-sm font-roboto text-cattler-navy/60">
                      por mês{billingCycle === "annual" && ", cobrado anualmente"}
                    </div>
                    {billingCycle === "annual" && (
                      <div className="text-xs font-roboto text-cattler-orange">
                        R$ {Math.round(selectedPlan.price * 12 * 0.9)} total por ano
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-lato font-medium text-cattler-navy">Currais:</span>
                    <span className="text-sm font-roboto text-cattler-navy/80 ml-2">{selectedPlan.pens}</span>
                  </div>
                  <div>
                    <span className="text-sm font-lato font-medium text-cattler-navy">Usuários:</span>
                    <span className="text-sm font-roboto text-cattler-navy/80 ml-2">{selectedPlan.users}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  {selectedPlan.keyFeatures.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm font-roboto text-cattler-navy/70">
                      <Check className="h-4 w-4 text-cattler-green mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                  {selectedPlan.keyFeatures.length > 3 && (
                    <div className="text-sm font-roboto text-cattler-navy/60">
                      +{selectedPlan.keyFeatures.length - 3} mais recursos
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Included Add-ons */}
            {includedAddOns.length > 0 && (
              <Card className="bg-white border border-cattler-green/30">
                <CardHeader>
                  <CardTitle className="text-xl font-barlow text-cattler-navy">Complementos Incluídos</CardTitle>
                  <CardDescription className="font-roboto text-cattler-navy/70">
                    Recursos já incluídos no seu plano {selectedPlan.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {includedAddOns.map((addOn) => (
                    <div
                      key={addOn.id}
                      className="flex items-start space-x-3 p-4 rounded-lg border-2 border-cattler-green/20 bg-cattler-green/5"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-lato font-medium text-cattler-navy">
                            {addOn.name}
                            <Badge className="ml-2 bg-cattler-green text-white text-xs">Incluído</Badge>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-roboto text-cattler-green font-medium">Incluído</span>
                          </div>
                        </div>
                        <p className="text-sm font-roboto text-cattler-navy/70 mt-1">{addOn.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Additional Pens & Users */}
            <Card className="bg-white border border-cattler-teal/30">
              <CardHeader>
                <CardTitle className="text-xl font-barlow text-cattler-navy">Capacidade Adicional</CardTitle>
                <CardDescription className="font-roboto text-cattler-navy/70">
                  Adicione mais currais e usuários ao seu plano
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Additional Pens */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-cattler-teal/20">
                  <div className="flex-1">
                    <h4 className="font-lato font-medium text-cattler-navy">Currais Adicionais</h4>
                    <p className="text-sm font-roboto text-cattler-navy/70">
                      R$ {PEN_PRICE}/mês por curral
                      {billingCycle === "annual" && " (10% de desconto anualmente)"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAdditionalPens(Math.max(0, additionalPens - 1))}
                      disabled={additionalPens === 0}
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="font-roboto font-medium text-cattler-navy w-8 text-center">{additionalPens}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAdditionalPens(additionalPens + 1)}
                      className="h-8 w-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Additional Users */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-cattler-teal/20">
                  <div className="flex-1">
                    <h4 className="font-lato font-medium text-cattler-navy">Usuários Adicionais</h4>
                    <p className="text-sm font-roboto text-cattler-navy/70">
                      R$ {USER_PRICE}/mês por usuário
                      {billingCycle === "annual" && " (10% de desconto anualmente)"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAdditionalUsers(Math.max(0, additionalUsers - 1))}
                      disabled={additionalUsers === 0}
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="font-roboto font-medium text-cattler-navy w-8 text-center">{additionalUsers}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAdditionalUsers(additionalUsers + 1)}
                      className="h-8 w-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Available Add-ons */}
            {availableAddOns.length > 0 && (
              <Card className="bg-white border border-cattler-teal/30">
                <CardHeader>
                  <CardTitle className="text-xl font-barlow text-cattler-navy">Complementos Disponíveis</CardTitle>
                  <CardDescription className="font-roboto text-cattler-navy/70">
                    Aprimore seu plano com recursos adicionais
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {availableAddOns.map((addOn) => {
                    const isSelected = selectedAddOns.includes(addOn.id)
                    const originalAddonPrice =
                      billingCycle === "annual" ? Math.round(addOn.price * 12 * 0.9) : addOn.price
                    const priceLabel = billingCycle === "monthly" ? "/mês" : "/ano"

                    return (
                      <div
                        key={addOn.id}
                        className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? addOn.isBoitel
                              ? "border-cattler-amber bg-cattler-amber/5"
                              : "border-cattler-teal bg-cattler-teal/5"
                            : "border-gray-200 hover:border-cattler-teal/50"
                        }`}
                      >
                        <Checkbox
                          id={addOn.id}
                          checked={isSelected}
                          onCheckedChange={() => handleAddOnToggle(addOn.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor={addOn.id}
                              className={`font-lato font-medium cursor-pointer ${
                                addOn.isBoitel ? "text-cattler-amber" : "text-cattler-navy"
                              }`}
                            >
                              {addOn.name}
                            </Label>
                            <div className="text-right">
                              <span
                                className={`font-barlow font-bold ${
                                  addOn.isBoitel ? "text-cattler-amber" : "text-cattler-navy"
                                }`}
                              >
                                +R$ {originalAddonPrice}
                                {priceLabel}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm font-roboto text-cattler-navy/70 mt-1">{addOn.description}</p>

                          {/* Client Users Counter for usuarios-clientes */}
                          {addOn.id === "usuarios-clientes" && isSelected && (
                            <div className="mt-4 p-3 bg-cattler-amber/10 border border-cattler-amber/30 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <span className="text-xs font-roboto text-cattler-navy/80">
                                    R$ 120/mês por usuário de cliente
                                    {billingCycle === "annual" && " (10% de desconto anualmente)"}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      setAdditionalClientUsers(Math.max(0, (additionalClientUsers || 0) - 1))
                                    }
                                    disabled={(additionalClientUsers || 0) === 0}
                                    className="h-6 w-6 p-0 text-xs"
                                  >
                                    -
                                  </Button>
                                  <span className="font-roboto font-medium text-cattler-navy w-6 text-center text-sm">
                                    {additionalClientUsers || 0}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setAdditionalClientUsers((additionalClientUsers || 0) + 1)}
                                    className="h-6 w-6 p-0 text-xs"
                                  >
                                    +
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Customer Info & Summary */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card className="bg-white border border-cattler-teal/30">
              <CardHeader>
                <CardTitle className="text-xl font-barlow text-cattler-navy">Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="font-lato text-cattler-navy">
                      Nome Completo *
                    </Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="mt-1"
                      placeholder="João Silva"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-lato text-cattler-navy">
                      Endereço de Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-1"
                      placeholder="joao@exemplo.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="company" className="font-lato text-cattler-navy">
                    Nome da Empresa *
                  </Label>
                  <Input
                    id="company"
                    value={customerInfo.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="mt-1"
                    placeholder="Fazenda São João"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-lato text-cattler-navy">
                    Número de Telefone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-1"
                    placeholder="+55 (11) 99999-9999"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-white border border-cattler-teal/30">
              <CardHeader>
                <CardTitle className="text-xl font-barlow text-cattler-navy">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-lato text-cattler-navy">{selectedPlan.name}</span>
                  <span className="font-roboto text-cattler-navy">
                    {billingCycle === "annual"
                      ? `R$ ${Math.round(selectedPlan.price * 12 * 0.9)} / ano`
                      : `R$ ${selectedPlan.price} / mês`}
                  </span>
                </div>

                {selectedAddOns.map((addOnId) => {
                  const addOn = ADD_ONS.find((a) => a.id === addOnId)
                  if (!addOn) return null

                  const addonPrice = billingCycle === "annual" ? Math.round(addOn.price * 12 * 0.9) : addOn.price
                  let displayPrice = addonPrice

                  if (addOn.id === "usuarios-clientes" && additionalClientUsers > 0) {
                    displayPrice = displayPrice * additionalClientUsers
                  }

                  const priceLabel = billingCycle === "monthly" ? "/mês" : "/ano"

                  return (
                    <div key={addOnId} className="flex justify-between">
                      <span className="font-lato text-cattler-navy/80">
                        {addOn.name}
                        {addOn.id === "usuarios-clientes" && additionalClientUsers > 0 && ` (${additionalClientUsers})`}
                      </span>
                      <span className="font-roboto text-cattler-navy/80">
                        +R$ {displayPrice}
                        {priceLabel}
                      </span>
                    </div>
                  )
                })}

                {(additionalPens > 0 || additionalUsers > 0) && (
                  <>
                    {additionalPens > 0 && (
                      <div className="flex justify-between">
                        <span className="font-lato text-cattler-navy/80">Currais Adicionais ({additionalPens})</span>
                        <span className="font-roboto text-cattler-navy/80">
                          {billingCycle === "annual"
                            ? `R$ ${Math.round(additionalPens * PEN_PRICE * 12 * 0.9)} / ano`
                            : `R$ ${additionalPens * PEN_PRICE} / mês`}
                        </span>
                      </div>
                    )}
                    {additionalUsers > 0 && (
                      <div className="flex justify-between">
                        <span className="font-lato text-cattler-navy/80">Usuários Adicionais ({additionalUsers})</span>
                        <span className="font-roboto text-cattler-navy/80">
                          {billingCycle === "annual"
                            ? `R$ ${Math.round(additionalUsers * USER_PRICE * 12 * 0.9)} / ano`
                            : `R$ ${additionalUsers * USER_PRICE} / mês`}
                        </span>
                      </div>
                    )}
                  </>
                )}

                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span className="font-lato text-cattler-navy">Total</span>
                  <span className="font-barlow text-cattler-green">{formatPrice(calculateTotal)}</span>
                </div>

                {billingCycle === "annual" && (
                  <div className="text-center text-sm font-roboto text-cattler-orange">
                    Você economiza R$ {Math.round(calculateTotal / 0.9 - calculateTotal)} com cobrança anual
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-cattler-orange hover:bg-cattler-orange/90 text-white font-lato font-bold py-3"
                  onClick={handleStartTrial}
                  disabled={!isFormValid}
                >
                  Continuar para Pagamento
                </Button>
              </CardFooter>
            </Card>

            {/* Additional Info */}
            <div className="text-center text-sm font-roboto text-cattler-navy/70">
              <p>30 dias de teste gratuito • Não é necessário cartão de crédito</p>
              <p className="mt-1">Cancele a qualquer momento durante o período de teste</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
