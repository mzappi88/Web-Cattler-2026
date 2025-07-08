"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CreditCard, Lock, Shield, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface PaymentPageProps {
  paymentData: any
  onBack: () => void
  onSuccess: () => void
}

export default function PaymentPage({ paymentData, onBack, onSuccess }: PaymentPageProps) {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    billingCity: "",
    billingZip: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setPaymentInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Store payment data for next step
    const completePaymentData = {
      ...paymentData,
      paymentInfo,
      paymentDate: new Date().toISOString(),
      transactionId: `TXN-${Date.now()}`,
    }

    localStorage.setItem("paymentData", JSON.stringify(completePaymentData))

    setIsProcessing(false)
    onSuccess()
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const isFormValid =
    paymentInfo.cardNumber.length >= 19 &&
    paymentInfo.expiryDate.length === 5 &&
    paymentInfo.cvv.length >= 3 &&
    paymentInfo.cardholderName.length > 0

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
            Voltar
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold font-barlow text-cattler-navy">Informações de Pagamento</h1>
          <p className="text-lg font-lato text-cattler-navy/80 mt-2">Finalize sua assinatura com segurança</p>
          <Badge className="mt-2 bg-cattler-navy text-white">Etapa 2 de 3</Badge>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white border border-cattler-teal/30">
                <CardHeader>
                  <CardTitle className="text-xl font-barlow text-cattler-navy flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-cattler-teal" />
                    Dados do Cartão
                  </CardTitle>
                  <CardDescription className="font-roboto text-cattler-navy/70">
                    Suas informações estão protegidas com criptografia SSL
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="cardholderName" className="font-lato text-cattler-navy">
                        Nome do Portador *
                      </Label>
                      <Input
                        id="cardholderName"
                        value={paymentInfo.cardholderName}
                        onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                        className="mt-1"
                        placeholder="João Silva"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber" className="font-lato text-cattler-navy">
                        Número do Cartão *
                      </Label>
                      <Input
                        id="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                        className="mt-1"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate" className="font-lato text-cattler-navy">
                          Validade *
                        </Label>
                        <Input
                          id="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                          className="mt-1"
                          placeholder="MM/AA"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="font-lato text-cattler-navy">
                          CVV *
                        </Label>
                        <Input
                          id="cvv"
                          value={paymentInfo.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                          className="mt-1"
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-lato font-medium text-cattler-navy">Endereço de Cobrança</h3>

                      <div>
                        <Label htmlFor="billingAddress" className="font-lato text-cattler-navy">
                          Endereço
                        </Label>
                        <Input
                          id="billingAddress"
                          value={paymentInfo.billingAddress}
                          onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                          className="mt-1"
                          placeholder="Rua das Flores, 123"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billingCity" className="font-lato text-cattler-navy">
                            Cidade
                          </Label>
                          <Input
                            id="billingCity"
                            value={paymentInfo.billingCity}
                            onChange={(e) => handleInputChange("billingCity", e.target.value)}
                            className="mt-1"
                            placeholder="São Paulo"
                          />
                        </div>
                        <div>
                          <Label htmlFor="billingZip" className="font-lato text-cattler-navy">
                            CEP
                          </Label>
                          <Input
                            id="billingZip"
                            value={paymentInfo.billingZip}
                            onChange={(e) => handleInputChange("billingZip", e.target.value)}
                            className="mt-1"
                            placeholder="01234-567"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <Button
                        type="submit"
                        disabled={!isFormValid || isProcessing}
                        className="w-full bg-cattler-orange hover:bg-cattler-orange/90 text-white font-lato font-bold py-3"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processando Pagamento...
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            Finalizar Pagamento
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <Card className="bg-green-50 border border-green-200 mt-6">
                <CardContent className="p-4">
                  <div className="flex items-center text-green-800">
                    <Shield className="h-5 w-5 mr-2" />
                    <span className="font-lato font-medium">Pagamento Seguro</span>
                  </div>
                  <p className="text-sm font-roboto text-green-700 mt-1">
                    Seus dados são protegidos com criptografia SSL de 256 bits. Não armazenamos informações do cartão.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-white border border-cattler-green/30 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg font-barlow text-cattler-navy">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-lato font-medium text-cattler-navy">{paymentData?.plan?.name}</h4>
                    <p className="text-sm font-roboto text-cattler-navy/70">{paymentData?.plan?.description}</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-lato text-cattler-navy">Plano Base</span>
                      <span className="font-roboto text-cattler-navy">R$ {paymentData?.plan?.price}</span>
                    </div>

                    {paymentData?.addOns?.length > 0 &&
                      paymentData.addOns.map((addonId: string, index: number) => (
                        <div key={index} className="flex justify-between">
                          <span className="font-lato text-cattler-navy/80 text-sm">+ {addonId}</span>
                          <span className="font-roboto text-cattler-navy/80 text-sm">R$ 0</span>
                        </div>
                      ))}

                    {(paymentData?.additionalPens > 0 || paymentData?.additionalUsers > 0) && (
                      <>
                        {paymentData.additionalPens > 0 && (
                          <div className="flex justify-between">
                            <span className="font-lato text-cattler-navy/80 text-sm">
                              Currais Extras ({paymentData.additionalPens})
                            </span>
                            <span className="font-roboto text-cattler-navy/80 text-sm">
                              R$ {paymentData.additionalPens * 30}
                            </span>
                          </div>
                        )}
                        {paymentData.additionalUsers > 0 && (
                          <div className="flex justify-between">
                            <span className="font-lato text-cattler-navy/80 text-sm">
                              Usuários Extras ({paymentData.additionalUsers})
                            </span>
                            <span className="font-roboto text-cattler-navy/80 text-sm">
                              R$ {paymentData.additionalUsers * 120}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span className="font-lato text-cattler-navy">Total</span>
                    <span className="font-barlow text-cattler-green">
                      R$ {paymentData?.total} / {paymentData?.billingCycle === "annual" ? "ano" : "mês"}
                    </span>
                  </div>

                  {paymentData?.billingCycle === "annual" && (
                    <div className="text-center text-sm font-roboto text-cattler-orange">
                      Você economiza 10% com cobrança anual
                    </div>
                  )}

                  <div className="pt-4 border-t border-cattler-teal/20">
                    <div className="flex items-center text-sm font-roboto text-cattler-navy/70">
                      <Calendar className="h-4 w-4 mr-2" />
                      30 dias de teste gratuito
                    </div>
                    <p className="text-xs font-roboto text-cattler-navy/60 mt-1">
                      Cancele a qualquer momento durante o período de teste
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
