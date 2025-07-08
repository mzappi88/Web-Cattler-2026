"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Mail, ArrowRight } from "lucide-react"

interface PaymentSuccessProps {
  paymentData: any
  onStartUsingApp: () => void
}

export default function PaymentSuccess({ paymentData, onStartUsingApp }: PaymentSuccessProps) {
  const getPlanDisplayName = (planName: string) => {
    switch (planName) {
      case "basic":
        return "Basic"
      case "standard":
        return "Standard"
      case "premium":
        return "Premium"
      default:
        return planName
    }
  }

  const planDisplayName = getPlanDisplayName(paymentData.plan.name)

  return (
    <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="mx-auto w-20 h-20 bg-cattler-green rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-barlow text-cattler-navy mb-4">Bem-vindo ao CATTLER!</h1>
            <p className="text-xl font-lato text-cattler-navy/80 mb-6">
              Sua assinatura do plano {planDisplayName} foi ativada com sucesso. Você está pronto para começar a
              gerenciar suas operações de gado.
            </p>
            <Badge className="bg-cattler-green text-white text-lg px-4 py-2">Teste Gratuito de 30 Dias Ativo</Badge>
          </div>

          {/* Order Details */}
          <Card className="bg-white border border-cattler-green/30 mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-barlow text-cattler-navy">Detalhes da Assinatura</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentData.promotionalState?.saleActive && (
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-bold">🎉 {paymentData.promotionalState.saleName} Aplicada!</span>
                  </div>
                  <p className="text-sm mt-1">Você economizou com nossa oferta especial!</p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="font-lato text-cattler-navy">Plano:</span>
                <span className="font-roboto font-medium text-cattler-navy">{planDisplayName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-lato text-cattler-navy">Cobrança:</span>
                <span className="font-roboto font-medium text-cattler-navy">
                  {paymentData.billingCycle === "monthly" ? "Mensal" : "Anual (10% de desconto)"}
                </span>
              </div>

              {(paymentData.additionalPens > 0 ||
                paymentData.additionalUsers > 0 ||
                (paymentData.addOns && paymentData.addOns.length > 0)) && (
                <div className="border-t border-cattler-green/20 pt-3 mt-3">
                  <h5 className="font-lato font-medium text-cattler-navy mb-2 text-sm">Detalhes da Assinatura:</h5>

                  {paymentData.additionalPens > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-roboto text-cattler-navy/80">Currais Adicionais:</span>
                      <span className="font-roboto text-cattler-navy/80">{paymentData.additionalPens}</span>
                    </div>
                  )}

                  {paymentData.additionalUsers > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-roboto text-cattler-navy/80">Usuários Adicionais:</span>
                      <span className="font-roboto text-cattler-navy/80">{paymentData.additionalUsers}</span>
                    </div>
                  )}

                  {paymentData.addOns && paymentData.addOns.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-roboto text-cattler-navy/80 mb-1">Complementos Adicionados:</p>
                      {paymentData.addOns.map((addOnId, index) => {
                        const addOns = [
                          { id: "boitel-addon", name: "Módulo Boitel" },
                          { id: "usuarios-clientes", name: "Usuários de Clientes" },
                          { id: "sanidade-animal", name: "Sanidade Animal" },
                          { id: "tronco", name: "Tronco" },
                          { id: "leitor-brinco", name: "Integração com Leitor de Brinco" },
                          { id: "alimentacao-avancada", name: "Alimentação Avançada" },
                          { id: "pre-misturas", name: "Geração de Pré-misturas" },
                          { id: "analytics", name: "Analytics" },
                          { id: "relatorio-mercado", name: "Relatório de Valor de Mercado" },
                        ]
                        const addOn = addOns.find((a) => a.id === addOnId)
                        if (!addOn) return null

                        return (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="font-roboto text-cattler-navy/80">
                              • {addOn.name}
                              {addOn.id === "usuarios-clientes" &&
                                paymentData.additionalClientUsers > 0 &&
                                ` (${paymentData.additionalClientUsers})`}
                            </span>
                            <span className="font-roboto text-cattler-green">✓</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="font-lato text-cattler-navy">Total:</span>
                <div className="text-right">
                  <span className="font-barlow font-bold text-cattler-green text-lg">
                    R${paymentData.total}
                    {paymentData.billingCycle === "monthly" ? "/mês" : "/ano"}
                  </span>
                  {paymentData.promotionalState?.saleActive && (
                    <div className="text-xs text-red-600 font-medium">✨ Preço promocional aplicado</div>
                  )}
                </div>
              </div>
              <div className="bg-cattler-light-teal/10 p-4 rounded-lg">
                <p className="text-sm font-roboto text-cattler-navy/80">
                  <strong>Período de Teste:</strong> Seu teste gratuito termina em{" "}
                  {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}. Você não será cobrado até lá.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-white border border-cattler-teal/30 mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-barlow text-cattler-navy">O Que Vem a Seguir?</CardTitle>
              <CardDescription className="font-roboto text-cattler-navy/70">
                Veja como começar com o CATTLER
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4 text-left">
                <div className="w-8 h-8 bg-cattler-green rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-lato font-medium text-cattler-navy">Verifique Seu Email</h4>
                  <p className="text-sm font-roboto text-cattler-navy/70">
                    Enviamos credenciais de login e instruções de configuração para {paymentData.customerInfo.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 text-left">
                <div className="w-8 h-8 bg-cattler-green rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-lato font-medium text-cattler-navy">Baixe o Aplicativo</h4>
                  <p className="text-sm font-roboto text-cattler-navy/70">
                    Obtenha o aplicativo móvel CATTLER para iOS e Android para gerenciar suas operações em qualquer
                    lugar
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 text-left">
                <div className="w-8 h-8 bg-cattler-green rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-lato font-medium text-cattler-navy">Configure Sua Operação</h4>
                  <p className="text-sm font-roboto text-cattler-navy/70">
                    Adicione seus currais, gado e programações de alimentação para começar
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={onStartUsingApp}
              className="w-full bg-cattler-orange hover:bg-cattler-orange/90 text-white font-lato font-bold py-3 text-lg"
            >
              Começar a Usar o CATTLER
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="border-2 border-cattler-teal text-cattler-navy hover:bg-cattler-teal hover:text-white font-lato font-bold"
              >
                <Download className="h-4 w-4 mr-2" />
                Baixar Aplicativo Móvel
              </Button>

              <Button
                variant="outline"
                className="border-2 border-cattler-teal text-cattler-navy hover:bg-cattler-teal hover:text-white font-lato font-bold"
              >
                <Mail className="h-4 w-4 mr-2" />
                Contatar Suporte
              </Button>
            </div>
          </div>

          {/* Support Info */}
          <div className="mt-8 text-center text-sm font-roboto text-cattler-navy/70">
            <p>Precisa de ajuda para começar? Nossa equipe de suporte está aqui para ajudar.</p>
            <p className="mt-1">
              Email:{" "}
              <a href="mailto:support@cattler.com" className="text-cattler-green hover:underline">
                support@cattler.com
              </a>{" "}
              | Telefone:{" "}
              <a href="tel:+1-555-123-4567" className="text-cattler-green hover:underline">
                +1 (555) 123-4567
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
