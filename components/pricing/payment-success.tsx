"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, ExternalLink, Mail, Calendar, CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface PaymentSuccessProps {
  paymentData: any
  onStartUsingApp: () => void
}

export default function PaymentSuccess({ paymentData, onStartUsingApp }: PaymentSuccessProps) {
  const handleDownloadReceipt = () => {
    // Simulate receipt download
    const receiptData = {
      transactionId: paymentData?.transactionId || `TXN-${Date.now()}`,
      date: new Date().toLocaleDateString("pt-BR"),
      plan: paymentData?.plan?.name,
      amount: paymentData?.total,
      billingCycle: paymentData?.billingCycle,
      customer: paymentData?.customerInfo?.name,
      email: paymentData?.customerInfo?.email,
    }

    console.log("Receipt data:", receiptData)
    // In a real app, this would generate and download a PDF
  }

  const handleContactSupport = () => {
    window.open("mailto:suporte@cattler.com?subject=Nova Assinatura - Suporte", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-barlow text-cattler-navy mb-4">
              Pagamento Realizado com Sucesso!
            </h1>
            <p className="text-lg font-lato text-cattler-navy/80">
              Bem-vindo ao FEEDER! Sua conta foi criada e está pronta para uso.
            </p>
            <Badge className="mt-4 bg-green-600 text-white">Configuração Completa</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Next Steps */}
              <Card className="bg-white border border-cattler-green/30">
                <CardHeader>
                  <CardTitle className="text-xl font-barlow text-cattler-navy">Próximos Passos</CardTitle>
                  <CardDescription className="font-roboto text-cattler-navy/70">
                    Tudo está configurado! Aqui está o que você pode fazer agora:
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-cattler-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-lato font-medium text-cattler-navy">Acesse sua conta</h4>
                      <p className="text-sm font-roboto text-cattler-navy/70">
                        Clique no botão abaixo para acessar o sistema FEEDER e começar a gerenciar seu confinamento.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-cattler-teal rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-lato font-medium text-cattler-navy">Configure sua operação</h4>
                      <p className="text-sm font-roboto text-cattler-navy/70">
                        Use o assistente de configuração para adicionar seus currais, dietas e animais.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-cattler-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-lato font-medium text-cattler-navy">Explore os recursos</h4>
                      <p className="text-sm font-roboto text-cattler-navy/70">
                        Descubra todas as funcionalidades do seu plano e como elas podem otimizar sua operação.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support Information */}
              <Card className="bg-blue-50 border border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg font-barlow text-blue-900">Precisa de Ajuda?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-roboto text-blue-800 mb-4">
                    Nossa equipe de suporte está pronta para ajudar você a começar. Entre em contato conosco se tiver
                    alguma dúvida.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleContactSupport}
                      className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contatar Suporte
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open("https://help.cattler.com", "_blank")}
                      className="border-blue-300 text-blue-700 hover:bg-blue-100"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Central de Ajuda
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={onStartUsingApp}
                  className="flex-1 bg-cattler-orange hover:bg-cattler-orange/90 text-white font-lato font-bold py-3"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Acessar FEEDER
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownloadReceipt}
                  className="border-cattler-teal text-cattler-teal hover:bg-cattler-teal/10 bg-transparent"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Recibo
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-white border border-cattler-green/30 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg font-barlow text-cattler-navy">Resumo da Compra</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Transaction Details */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm font-roboto text-cattler-navy/70">
                      <CreditCard className="h-4 w-4 mr-2" />
                      ID: {paymentData?.transactionId || `TXN-${Date.now()}`}
                    </div>
                    <div className="flex items-center text-sm font-roboto text-cattler-navy/70">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date().toLocaleDateString("pt-BR")}
                    </div>
                  </div>

                  <Separator />

                  {/* Plan Details */}
                  <div>
                    <h4 className="font-lato font-medium text-cattler-navy">{paymentData?.plan?.name}</h4>
                    <p className="text-sm font-roboto text-cattler-navy/70">{paymentData?.plan?.description}</p>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-1">
                    <p className="text-sm font-roboto text-cattler-navy">
                      <strong>Cliente:</strong> {paymentData?.customerInfo?.name}
                    </p>
                    <p className="text-sm font-roboto text-cattler-navy">
                      <strong>Email:</strong> {paymentData?.customerInfo?.email}
                    </p>
                    <p className="text-sm font-roboto text-cattler-navy">
                      <strong>Empresa:</strong> {paymentData?.customerInfo?.company}
                    </p>
                  </div>

                  <Separator />

                  {/* Pricing Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-lato text-cattler-navy">Plano Base</span>
                      <span className="font-roboto text-cattler-navy">R$ {paymentData?.plan?.price}</span>
                    </div>

                    {paymentData?.addOns?.length > 0 &&
                      paymentData.addOns.map((addonId: string, index: number) => (
                        <div key={index} className="flex justify-between">
                          <span className="font-lato text-cattler-navy/80 text-sm">+ {addonId}</span>
                          <span className="font-roboto text-cattler-navy/80 text-sm">Incluído</span>
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
                    <span className="font-barlow text-cattler-green">R$ {paymentData?.total}</span>
                  </div>

                  <div className="text-center text-sm font-roboto text-cattler-navy/60">
                    Cobrança {paymentData?.billingCycle === "annual" ? "anual" : "mensal"}
                  </div>

                  {/* Trial Information */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center text-green-800 text-sm font-lato font-medium">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      30 Dias Grátis Ativados
                    </div>
                    <p className="text-xs font-roboto text-green-700 mt-1">
                      Sua cobrança começará em{" "}
                      {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("pt-BR")}
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
