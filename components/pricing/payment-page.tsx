"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, Shield, Check, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PaymentData {
  plan: any
  addOns: string[]
  customerInfo: any
  total: number
  billingCycle: "monthly" | "annual"
  planType: "owner" | "custom"
  additionalPens: number
  additionalUsers: number
  additionalClientUsers: number
  promotionalState?: {
    saleName: string
  }
}

interface PaymentPageProps {
  paymentData: PaymentData
  onBack: () => void
  onSuccess: () => void
}

export default function PaymentPage({ paymentData, onBack, onSuccess }: PaymentPageProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [billingAddress, setBillingAddress] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    setIsProcessing(true)
    setError(null)

    try {
      // For demo purposes, just simulate processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate successful payment
      console.log("Payment successful (demo mode)")
      onSuccess()
    } catch (error) {
      console.error("Payment error:", error)
      setError("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleAddressChange = (field: string, value: string) => {
    setBillingAddress((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-cattler-navy hover:text-cattler-green font-lato"
            disabled={isProcessing}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para o Pedido
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold font-barlow text-cattler-navy">Informações de Pagamento</h1>
          <p className="text-lg font-lato text-cattler-navy/80 mt-2">
            Complete sua assinatura do {paymentData.plan.name}
          </p>
          <div className="mt-2 flex items-center">
            <Badge className="bg-cattler-teal text-white">
              {paymentData.planType === "owner" ? "Owner" : "Custom Feeder"}
            </Badge>
            <Badge className="ml-2 bg-cattler-navy text-white">Etapa 2 de 3</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Payment Form */}
          <div className="space-y-6">
            {/* Demo Notice */}
            <Alert className="border-cattler-orange/30 bg-cattler-orange/5">
              <AlertDescription className="text-cattler-navy">
                <strong>Modo de Demonstração:</strong> Esta é uma demonstração. Nenhum pagamento real será processado.
              </AlertDescription>
            </Alert>

            {/* Security Notice */}
            <Card className="bg-white border border-cattler-green/30">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-cattler-green" />
                  <div>
                    <p className="font-lato font-medium text-cattler-navy">Pagamento Seguro</p>
                    <p className="text-sm font-roboto text-cattler-navy/70">
                      Suas informações de pagamento são criptografadas e seguras
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white border border-cattler-teal/30">
              <CardHeader>
                <CardTitle className="text-xl font-barlow text-cattler-navy flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Método de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Card Information */}
                  <div>
                    <Label className="font-lato text-cattler-navy mb-2 block">Informações do Cartão *</Label>
                    <div className="border border-gray-300 rounded-md p-3 bg-white">
                      <Input
                        placeholder="4242 4242 4242 4242"
                        className="border-0 p-0 focus:ring-0"
                        disabled={isProcessing}
                      />
                    </div>
                    <p className="text-xs text-cattler-navy/60 mt-1">
                      Demo: Use o número do cartão 4242 4242 4242 4242 com qualquer data futura e CVC
                    </p>
                  </div>

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <Label className="font-lato text-cattler-navy text-lg font-medium">Endereço de Cobrança</Label>

                    <div>
                      <Label htmlFor="address" className="font-lato text-cattler-navy">
                        Endereço *
                      </Label>
                      <Input
                        id="address"
                        value={billingAddress.address}
                        onChange={(e) => handleAddressChange("address", e.target.value)}
                        className="mt-1"
                        placeholder="123 Main Street"
                        required
                        disabled={isProcessing}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="font-lato text-cattler-navy">
                          Cidade *
                        </Label>
                        <Input
                          id="city"
                          value={billingAddress.city}
                          onChange={(e) => handleAddressChange("city", e.target.value)}
                          className="mt-1"
                          placeholder="City"
                          required
                          disabled={isProcessing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="font-lato text-cattler-navy">
                          Estado *
                        </Label>
                        <Input
                          id="state"
                          value={billingAddress.state}
                          onChange={(e) => handleAddressChange("state", e.target.value)}
                          className="mt-1"
                          placeholder="State"
                          required
                          disabled={isProcessing}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipCode" className="font-lato text-cattler-navy">
                          CEP *
                        </Label>
                        <Input
                          id="zipCode"
                          value={billingAddress.zipCode}
                          onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                          className="mt-1"
                          placeholder="12345"
                          required
                          disabled={isProcessing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="country" className="font-lato text-cattler-navy">
                          País *
                        </Label>
                        <select
                          id="country"
                          value={billingAddress.country}
                          onChange={(e) => handleAddressChange("country", e.target.value)}
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cattler-green"
                          required
                          disabled={isProcessing}
                        >
                          <option value="US">Estados Unidos</option>
                          <option value="CA">Canadá</option>
                          <option value="MX">México</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertDescription className="text-red-800">{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-cattler-orange hover:bg-cattler-orange/90 text-white font-lato font-bold py-3"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processando Pagamento...
                      </>
                    ) : (
                      `Finalizar Pagamento - R$${paymentData.total}${paymentData.billingCycle === "monthly" ? "/mês" : "/ano"}`
                    )}
                  </Button>

                  <p className="text-xs font-roboto text-cattler-navy/60 text-center">
                    Ao concluir esta compra, você concorda com nossos Termos de Serviço e Política de Privacidade.
                    {paymentData.billingCycle === "monthly"
                      ? " Você pode cancelar a qualquer momento."
                      : " Assinaturas anuais são cobradas antecipadamente."}
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="bg-white border border-cattler-teal/30">
              <CardHeader>
                <CardTitle className="text-xl font-barlow text-cattler-navy">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Customer Info */}
                <div className="bg-cattler-light-teal/10 p-4 rounded-lg">
                  <h4 className="font-lato font-medium text-cattler-navy mb-2">Informações do Cliente</h4>
                  <div className="space-y-1 text-sm font-roboto text-cattler-navy/80">
                    <p>{paymentData.customerInfo.name}</p>
                    <p>{paymentData.customerInfo.email}</p>
                    <p>{paymentData.customerInfo.company}</p>
                    {paymentData.customerInfo.phone && <p>{paymentData.customerInfo.phone}</p>}
                  </div>
                </div>

                {/* Plan Details with promotional pricing */}
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-lato font-medium text-cattler-navy">{paymentData.plan.name}</h4>
                      <p className="text-sm font-roboto text-cattler-navy/70">{paymentData.plan.description}</p>
                      <div className="flex items-center mt-1 space-x-4">
                        <span className="text-xs font-roboto text-cattler-navy/60">{paymentData.plan.pens}</span>
                        <span className="text-xs font-roboto text-cattler-navy/60">{paymentData.plan.users}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {/* Show promotional pricing if applicable */}
                      {paymentData.promotionalState &&
                        (() => {
                          const originalPlanPrice =
                            paymentData.billingCycle === "monthly"
                              ? paymentData.plan.originalPrice || paymentData.plan.price
                              : Math.round((paymentData.plan.originalPrice || paymentData.plan.price) * 12 * 0.9)
                          const hasPromotion = paymentData.plan.price !== originalPlanPrice

                          return hasPromotion ? (
                            <div className="flex flex-col items-end">
                              <div className="flex items-center gap-1 mb-1">
                                <span className="text-sm line-through text-gray-400">R$ {originalPlanPrice}</span>
                                <Badge className="bg-red-500 text-white text-xs animate-pulse">
                                  {paymentData.promotionalState.saleName}
                                </Badge>
                              </div>
                              <div className="font-barlow font-bold text-cattler-navy">
                                R${" "}
                                {paymentData.billingCycle === "monthly"
                                  ? paymentData.plan.price
                                  : Math.round(paymentData.plan.price * 12 * 0.9)}
                              </div>
                            </div>
                          ) : (
                            <div className="font-barlow font-bold text-cattler-navy">
                              R${" "}
                              {paymentData.billingCycle === "monthly"
                                ? paymentData.plan.price
                                : Math.round(paymentData.plan.price * 12 * 0.9)}
                            </div>
                          )
                        })()}
                      <div className="text-xs font-roboto text-cattler-navy/60">
                        {paymentData.billingCycle === "monthly" ? "por mês" : "por ano"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Pens & Users */}
                {(paymentData.additionalPens > 0 || paymentData.additionalUsers > 0) && (
                  <>
                    {paymentData.additionalPens > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="font-roboto text-cattler-navy/80">
                          Currais Adicionais ({paymentData.additionalPens})
                        </span>
                        <span className="font-roboto text-cattler-navy/80">
                          +R${" "}
                          {paymentData.billingCycle === "annual"
                            ? Math.round(paymentData.additionalPens * 30 * 12 * 0.9)
                            : paymentData.additionalPens * 30}
                          {paymentData.billingCycle === "monthly" ? "/mês" : "/ano"}
                        </span>
                      </div>
                    )}
                    {paymentData.additionalUsers > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="font-roboto text-cattler-navy/80">
                          Usuários Adicionais ({paymentData.additionalUsers})
                        </span>
                        <span className="font-roboto text-cattler-navy/80">
                          +R${" "}
                          {paymentData.billingCycle === "annual"
                            ? Math.round(paymentData.additionalUsers * 120 * 12 * 0.9)
                            : paymentData.additionalUsers * 120}
                          {paymentData.billingCycle === "monthly" ? "/mês" : "/ano"}
                        </span>
                      </div>
                    )}
                  </>
                )}

                {/* Add-ons */}
                {paymentData.addOns.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-lato font-medium text-cattler-navy">Complementos</h4>
                    {paymentData.addOns.map((addOnId, index) => {
                      // Define the add-ons array (same as in checkout)
                      const addOns = [
                        {
                          id: "boitel-addon",
                          name: "Módulo Boitel",
                          price: 600,
                        },
                        {
                          id: "usuarios-clientes",
                          name: "Usuários de Clientes",
                          price: 120,
                        },
                        {
                          id: "sanidade-animal",
                          name: "Sanidade Animal",
                          price: 400,
                        },
                        {
                          id: "tronco",
                          name: "Tronco",
                          price: 300,
                        },
                        {
                          id: "leitor-brinco",
                          name: "Integração com Leitor de Brinco",
                          price: 300,
                        },
                        {
                          id: "alimentacao-avancada",
                          name: "Alimentação Avançada",
                          price: 600,
                        },
                        {
                          id: "pre-misturas",
                          name: "Geração de Pré-misturas",
                          price: 150,
                        },
                        {
                          id: "analytics",
                          name: "Analytics",
                          price: 300,
                        },
                        {
                          id: "relatorio-mercado",
                          name: "Relatório de Valor de Mercado",
                          price: 150,
                        },
                      ]

                      const addOn = addOns.find((a) => a.id === addOnId)
                      if (!addOn) return null

                      const addonPrice =
                        paymentData.billingCycle === "annual" ? Math.round(addOn.price * 12 * 0.9) : addOn.price
                      const priceLabel = paymentData.billingCycle === "monthly" ? "/mês" : "/ano"

                      return (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="font-roboto text-cattler-navy/80">
                            {addOn.name}
                            {addOn.id === "usuarios-clientes" &&
                              paymentData.additionalClientUsers > 0 &&
                              ` (${paymentData.additionalClientUsers})`}
                          </span>
                          <span className="font-roboto text-cattler-navy/80">
                            +R$ {addonPrice}
                            {priceLabel}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}

                <Separator />

                {/* Total */}
                <div className="flex justify-between text-lg font-bold">
                  <span className="font-lato text-cattler-navy">Total</span>
                  <span className="font-barlow text-cattler-green">
                    R${paymentData.total}
                    {paymentData.billingCycle === "monthly" ? "/mês" : "/ano"}
                  </span>
                </div>

                {paymentData.billingCycle === "annual" && (
                  <div className="text-center text-sm font-roboto text-cattler-orange">
                    Você economiza R${Math.round(paymentData.total / 0.9 - paymentData.total)} com cobrança anual
                  </div>
                )}

                {/* Trial Info */}
                <div className="bg-cattler-green/10 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-cattler-green mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-lato font-medium text-cattler-navy">30 Dias de Teste Gratuito</h4>
                      <p className="text-sm font-roboto text-cattler-navy/70">
                        Você não será cobrado até o fim do período de teste. Cancele a qualquer momento durante o
                        período de teste.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card className="bg-white border border-cattler-teal/30">
              <CardHeader>
                <CardTitle className="text-lg font-barlow text-cattler-navy">Segurança e Confiança</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="h-4 w-4 text-cattler-green" />
                  <span className="text-sm font-roboto text-cattler-navy/80">Criptografia SSL de 256 bits</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-cattler-green" />
                  <span className="text-sm font-roboto text-cattler-navy/80">Em conformidade com PCI DSS</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-cattler-green" />
                  <span className="text-sm font-roboto text-cattler-navy/80">Sem taxas ocultas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-cattler-green" />
                  <span className="text-sm font-roboto text-cattler-navy/80">Cancele a qualquer momento</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
