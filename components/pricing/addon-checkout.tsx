"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Check, AlertCircle, User, UserPlus } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import PaymentPage from "./payment-page"
import PaymentSuccess from "./payment-success"
import { Badge } from "@/components/ui/badge"

interface AddOn {
  id: string
  name: string
  description: string
  price: number
  comingSoon?: boolean
  promotionalState?: {
    saleActive: boolean
    saleName: string
    discounts: {
      monthly: {
        [productId: string]: {
          isActive: boolean
          discountFactor: number
        }
      }
      annual: {
        [productId: string]: {
          isActive: boolean
          discountFactor: number
        }
      }
      xMonthly: {
        [productId: string]: {
          isActive: boolean
          discountFactor: number
          xMonths: number
        }
      }
      freeMonths: {
        [productId: string]: {
          isActive: boolean
          freeMonths: number
        }
      }
    }
  }
}

interface AddOnCheckoutProps {
  selectedAddOn: AddOn
  onBack: () => void
}

export default function AddOnCheckout({ selectedAddOn, onBack }: AddOnCheckoutProps) {
  const [userType, setUserType] = useState<"existing" | "new" | null>(null)
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    name: "",
    company: "",
    phone: "",
  })
  const [currentStep, setCurrentStep] = useState<"user-type" | "info" | "payment" | "success">("user-type")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationError, setVerificationError] = useState<string | null>(null)

  // Add promotional calculation functions
  const getActivePromotion = useCallback(
    (productId: string, billingType: "monthly" | "annual") => {
      if (!selectedAddOn.promotionalState?.saleActive) return null

      // Check xMonthly promotions first
      if (selectedAddOn.promotionalState.discounts.xMonthly[productId]?.isActive) {
        return {
          type: "xMonthly",
          ...selectedAddOn.promotionalState.discounts.xMonthly[productId],
        }
      }

      // Check freeMonths promotions
      if (selectedAddOn.promotionalState.discounts.freeMonths[productId]?.isActive) {
        return {
          type: "freeMonths",
          ...selectedAddOn.promotionalState.discounts.freeMonths[productId],
        }
      }

      // Check billing-specific discounts
      const discountType = billingType === "annual" ? "annual" : "monthly"
      if (selectedAddOn.promotionalState.discounts[discountType][productId]?.isActive) {
        return {
          type: discountType,
          ...selectedAddOn.promotionalState.discounts[discountType][productId],
        }
      }

      return null
    },
    [selectedAddOn.promotionalState],
  )

  const calculatePromotionalPrice = useCallback(
    (originalPrice: number, productId: string, billingType: "monthly" | "annual") => {
      const promotion = getActivePromotion(productId, billingType)

      if (!promotion) return originalPrice

      if (promotion.type === "freeMonths") {
        return originalPrice
      }

      return Math.round(originalPrice * (1 - promotion.discountFactor))
    },
    [getActivePromotion],
  )

  const getPromotionBadgeText = useCallback(
    (productId: string, billingType: "monthly" | "annual") => {
      const promotion = getActivePromotion(productId, billingType)

      if (!promotion) return null

      switch (promotion.type) {
        case "xMonthly":
          return `${Math.round(promotion.discountFactor * 100)}% de desconto por ${promotion.xMonths} meses`
        case "freeMonths":
          return `${promotion.freeMonths} meses grátis`
        case "annual":
        case "monthly":
          return `${Math.round(promotion.discountFactor * 100)}% de desconto`
        default:
          return null
      }
    },
    [getActivePromotion],
  )

  // Calculate promotional pricing
  const originalPrice = selectedAddOn.price
  const promotionalPrice = selectedAddOn.promotionalState
    ? calculatePromotionalPrice(originalPrice, selectedAddOn.id, "monthly")
    : originalPrice
  const hasPromotion = selectedAddOn.promotionalState ? getActivePromotion(selectedAddOn.id, "monthly") : null
  const promotionText = selectedAddOn.promotionalState ? getPromotionBadgeText(selectedAddOn.id, "monthly") : null

  // Check if addon is coming soon
  if (selectedAddOn.comingSoon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4 text-cattler-navy hover:text-cattler-green font-lato"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Planos
            </Button>
            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-blue-800">
                <strong>{selectedAddOn.name}</strong> estará disponível em breve. Fique atento às atualizações!
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    )
  }

  const handleUserTypeSelect = (type: "existing" | "new") => {
    setUserType(type)
    setCurrentStep("info")
  }

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleVerifyExistingUser = async () => {
    if (!customerInfo.email) return

    setIsVerifying(true)
    setVerificationError(null)

    try {
      // Simulate API call to verify existing user
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate verification result (for demo, we'll randomly succeed/fail)
      const isValidUser = Math.random() > 0.3 // 70% success rate for demo

      if (isValidUser) {
        // Simulate fetching user data
        setCustomerInfo((prev) => ({
          ...prev,
          name: "John Doe", // Simulated data
          company: "Demo Ranch", // Simulated data
          phone: "+1 (555) 123-4567", // Simulated data
        }))
        setCurrentStep("payment")
      } else {
        setVerificationError(
          "Email não encontrado em nosso sistema. Por favor, verifique seu email ou inscreva-se em um plano primeiro.",
        )
      }
    } catch (error) {
      console.error("Verification error:", error)
      setVerificationError("Erro ao verificar usuário. Tente novamente.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleNewUserContinue = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.company) return
    setCurrentStep("payment")
  }

  const handleBackToInfo = () => {
    setCurrentStep("info")
  }

  const handlePaymentSuccess = () => {
    setCurrentStep("success")
  }

  const handleStartUsingApp = () => {
    window.location.href = "https://app.feeder.cattler.com"
  }

  const paymentData = {
    plan: {
      name: selectedAddOn.name,
      description: selectedAddOn.description,
      price: promotionalPrice, // Use promotional price
      pens: "Add-on",
      users: "Add-on",
    },
    addOns: [],
    customerInfo,
    total: promotionalPrice, // Use promotional price
    billingCycle: "monthly" as const,
    planType: "addon" as const,
    isAddOnOnly: true,
    additionalPens: 0,
    additionalUsers: 0,
    additionalClientUsers: 0,
    promotionalState: selectedAddOn.promotionalState, // Pass promotional state
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20">
      <div className="container mx-auto px-4 py-8">
        {currentStep === "user-type" && (
          <>
            {/* Header with promotional banner */}
            {selectedAddOn.promotionalState?.saleActive && (
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-center py-3 mb-8 rounded-lg shadow-lg">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-bold animate-pulse">
                    🔥 {selectedAddOn.promotionalState.saleName} 🔥
                  </span>
                  <span className="text-sm">Oferta por tempo limitado - Economize em complementos selecionados!</span>
                </div>
              </div>
            )}

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
              <h1 className="text-3xl md:text-4xl font-bold font-barlow text-cattler-navy">
                Adicionar {selectedAddOn.name}
              </h1>
              <p className="text-lg font-lato text-cattler-navy/80 mt-2">
                Adicione este recurso ao seu plano FEEDER existente
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Add-on Details with promotional pricing */}
              <Card className="bg-white border-2 border-cattler-green mb-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-barlow text-cattler-navy">{selectedAddOn.name}</CardTitle>
                  <CardDescription className="text-lg font-roboto text-cattler-navy/70">
                    {selectedAddOn.description}
                  </CardDescription>
                  <div className="text-4xl font-bold font-barlow text-cattler-green mt-4">
                    {hasPromotion && (
                      <div className="flex flex-col items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl line-through text-gray-400">+R${originalPrice}/mês</span>
                          <Badge className="bg-red-500 text-white text-sm animate-pulse">
                            {selectedAddOn.promotionalState?.saleName}
                          </Badge>
                        </div>
                      </div>
                    )}
                    +R${promotionalPrice}/mês
                    {promotionText && (
                      <Badge className="bg-red-500 text-white text-sm mt-2 animate-pulse block mx-auto">
                        {promotionText}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
              </Card>

              {/* User Type Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white border border-cattler-teal/30 hover:border-cattler-teal hover:shadow-lg transition-all cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-cattler-teal/10 rounded-full flex items-center justify-center mb-4">
                      <User className="h-8 w-8 text-cattler-teal" />
                    </div>
                    <CardTitle className="text-xl font-barlow text-cattler-navy">Membro Existente da Cattler</CardTitle>
                    <CardDescription className="font-roboto text-cattler-navy/70">
                      Já tenho um plano FEEDER e quero adicionar este recurso
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm font-roboto text-cattler-navy/70">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-cattler-green mr-2" />
                        Verificação rápida com seu email
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-cattler-green mr-2" />
                        Ativação instantânea em sua conta
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-cattler-green mr-2" />
                        Cobrança adicionada ao plano existente
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => handleUserTypeSelect("existing")}
                      className="w-full bg-cattler-teal hover:bg-cattler-green text-white font-lato font-bold"
                    >
                      Sou um Cliente Existente
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-white border border-cattler-orange/30 hover:border-cattler-orange hover:shadow-lg transition-all cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-cattler-orange/10 rounded-full flex items-center justify-center mb-4">
                      <UserPlus className="h-8 w-8 text-cattler-orange" />
                    </div>
                    <CardTitle className="text-xl font-barlow text-cattler-navy">Novo no FEEDER</CardTitle>
                    <CardDescription className="font-roboto text-cattler-navy/70">
                      Preciso obter um plano FEEDER primeiro
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert className="border-cattler-orange/30 bg-cattler-orange/5">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-cattler-navy">
                        Complementos requerem um plano FEEDER ativo. Você precisará selecionar um plano base primeiro.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={onBack}
                      className="w-full bg-cattler-orange hover:bg-cattler-orange/90 text-white font-lato font-bold"
                    >
                      Escolha um Plano Primeiro
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </>
        )}

        {currentStep === "info" && (
          <>
            {/* Header */}
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => setCurrentStep("user-type")}
                className="mb-4 text-cattler-navy hover:text-cattler-green font-lato"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold font-barlow text-cattler-navy">
                {userType === "existing" ? "Verifique Sua Conta" : "Suas Informações"}
              </h1>
              <p className="text-lg font-lato text-cattler-navy/80 mt-2">
                {userType === "existing"
                  ? "Digite seu email registrado para verificar sua conta FEEDER"
                  : "Por favor, forneça suas informações para continuar"}
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="bg-white border border-cattler-teal/30">
                <CardHeader>
                  <CardTitle className="text-xl font-barlow text-cattler-navy">
                    {userType === "existing" ? "Verificação de Conta" : "Informações de Contato"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userType === "existing" ? (
                    <>
                      <div>
                        <Label htmlFor="email" className="font-lato text-cattler-navy">
                          Endereço de Email Registrado *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={customerInfo.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="mt-1"
                          placeholder="your-email@example.com"
                          required
                        />
                        <p className="text-xs font-roboto text-cattler-navy/60 mt-1">
                          Digite o endereço de email associado à sua conta FEEDER
                        </p>
                      </div>

                      {verificationError && (
                        <Alert className="border-red-200 bg-red-50">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription className="text-red-800">{verificationError}</AlertDescription>
                        </Alert>
                      )}
                    </>
                  ) : (
                    <>
                      <Alert className="border-cattler-orange/30 bg-cattler-orange/5">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-cattler-navy">
                          <strong>Nota:</strong> Complementos requerem um plano FEEDER ativo. Se você ainda não tem um
                          plano, por favor selecione um plano base primeiro.
                        </AlertDescription>
                      </Alert>

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
                            placeholder="John Doe"
                            required
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
                            placeholder="john@example.com"
                            required
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
                          placeholder="Your Ranch Name"
                          required
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
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter>
                  {userType === "existing" ? (
                    <Button
                      onClick={handleVerifyExistingUser}
                      disabled={!customerInfo.email || isVerifying}
                      className="w-full bg-cattler-teal hover:bg-cattler-green text-white font-lato font-bold"
                    >
                      {isVerifying ? "Verificando..." : "Verificar Conta"}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNewUserContinue}
                      disabled={!customerInfo.name || !customerInfo.email || !customerInfo.company}
                      className="w-full bg-cattler-orange hover:bg-cattler-orange/90 text-white font-lato font-bold"
                    >
                      Continuar para Pagamento
                    </Button>
                  )}
                </CardFooter>
              </Card>

              {/* Add-on Summary with promotional pricing */}
              <Card className="bg-white border border-cattler-green/30 mt-6">
                <CardHeader>
                  <CardTitle className="text-lg font-barlow text-cattler-navy">Resumo do Complemento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-lato font-medium text-cattler-navy">{selectedAddOn.name}</h4>
                      <p className="text-sm font-roboto text-cattler-navy/70">{selectedAddOn.description}</p>
                    </div>
                    <div className="text-right">
                      {hasPromotion && (
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-sm line-through text-gray-400">+R${originalPrice}</span>
                          <Badge className="bg-red-500 text-white text-xs animate-pulse">
                            {selectedAddOn.promotionalState?.saleName}
                          </Badge>
                        </div>
                      )}
                      <div className="text-xl font-bold font-barlow text-cattler-green">+R${promotionalPrice}</div>
                      <div className="text-sm font-roboto text-cattler-navy/60">por mês</div>
                      {promotionText && (
                        <Badge className="bg-red-500 text-white text-xs mt-1 animate-pulse">{promotionText}</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {currentStep === "payment" && (
          <PaymentPage paymentData={paymentData} onBack={handleBackToInfo} onSuccess={handlePaymentSuccess} />
        )}

        {currentStep === "success" && (
          <PaymentSuccess paymentData={paymentData} onStartUsingApp={handleStartUsingApp} />
        )}
      </div>
    </div>
  )
}
