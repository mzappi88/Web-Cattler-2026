"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, Building, Users, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FeedlotInfoProps {
  paymentData: any
  onBack: () => void
  onComplete: (feedlotData: any) => void
}

export default function FeedlotInfo({ paymentData, onBack, onComplete }: FeedlotInfoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedlotData, setFeedlotData] = useState({
    // Location Information
    feedyardName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "BR",

    // Feedlot Information
    howDidYouHear: "",
    previousSoftware: "",
    feedlotCapacity: "",
    additionalNotes: "",
  })

  const howDidYouHearOptions = [
    "Pesquisa Google",
    "Redes Sociais",
    "Conferência do Setor",
    "Indicação de colega",
    "Publicação especializada",
    "Representante de vendas",
    "Cliente existente",
    "Outro",
  ]

  const previousSoftwareOptions = ["Performance Beef", "Nenhum software de alimentação", "Microtechnologies", "Outro"]

  const handleInputChange = (field: string, value: string) => {
    setFeedlotData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    onComplete(feedlotData)
    setIsSubmitting(false)
  }

  const isFormValid = () => {
    return (
      feedlotData.feedyardName &&
      feedlotData.address &&
      feedlotData.city &&
      feedlotData.state &&
      feedlotData.zipCode &&
      feedlotData.howDidYouHear &&
      feedlotData.previousSoftware &&
      feedlotData.feedlotCapacity
    )
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
            disabled={isSubmitting}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Pagamento
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold font-barlow text-cattler-navy">
            Conte-nos Sobre Seu Confinamento
          </h1>
          <p className="text-lg font-lato text-cattler-navy/80 mt-2">
            Ajude-nos a personalizar o FEEDER para sua operação específica
          </p>
          <div className="mt-2 flex items-center">
            <Badge className="bg-cattler-teal text-white">
              {paymentData.planType === "owner" ? "Owner" : "Custom Feeder"}
            </Badge>
            <Badge className="ml-2 bg-cattler-green text-white">Etapa 3 de 3</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Feedyard Location */}
              <Card className="bg-white border border-cattler-teal/30">
                <CardHeader>
                  <CardTitle className="text-xl font-barlow text-cattler-navy flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Localização do Confinamento
                  </CardTitle>
                  <CardDescription className="font-roboto text-cattler-navy/70">
                    Onde está localizado seu confinamento?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="feedyardName" className="font-lato text-cattler-navy">
                      Nome do Confinamento *
                    </Label>
                    <Input
                      id="feedyardName"
                      value={feedlotData.feedyardName}
                      onChange={(e) => handleInputChange("feedyardName", e.target.value)}
                      className="mt-1"
                      placeholder="Fazenda São João"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="font-lato text-cattler-navy">
                      Endereço *
                    </Label>
                    <Input
                      id="address"
                      value={feedlotData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="mt-1"
                      placeholder="Rua das Fazendas, 123"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="font-lato text-cattler-navy">
                        Cidade *
                      </Label>
                      <Input
                        id="city"
                        value={feedlotData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="mt-1"
                        placeholder="Campo Grande"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="font-lato text-cattler-navy">
                        Estado *
                      </Label>
                      <select
                        id="state"
                        value={feedlotData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cattler-green"
                        required
                      >
                        <option value="">Selecione o Estado</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode" className="font-lato text-cattler-navy">
                        CEP *
                      </Label>
                      <Input
                        id="zipCode"
                        value={feedlotData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        className="mt-1"
                        placeholder="79000-000"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country" className="font-lato text-cattler-navy">
                        País *
                      </Label>
                      <select
                        id="country"
                        value={feedlotData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cattler-green"
                        required
                      >
                        <option value="BR">Brasil</option>
                        <option value="AR">Argentina</option>
                        <option value="UY">Uruguai</option>
                        <option value="PY">Paraguai</option>
                        <option value="BO">Bolívia</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feedlot Information */}
              <Card className="bg-white border border-cattler-teal/30">
                <CardHeader>
                  <CardTitle className="text-xl font-barlow text-cattler-navy flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Informações do Confinamento
                  </CardTitle>
                  <CardDescription className="font-roboto text-cattler-navy/70">
                    Conte-nos mais sobre sua operação
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="howDidYouHear" className="font-lato text-cattler-navy">
                      Como você ficou sabendo sobre nós? *
                    </Label>
                    <select
                      id="howDidYouHear"
                      value={feedlotData.howDidYouHear}
                      onChange={(e) => handleInputChange("howDidYouHear", e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cattler-green"
                      required
                    >
                      <option value="">Selecione uma opção</option>
                      {howDidYouHearOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="previousSoftware" className="font-lato text-cattler-navy">
                      Software de alimentação anterior? *
                    </Label>
                    <select
                      id="previousSoftware"
                      value={feedlotData.previousSoftware}
                      onChange={(e) => handleInputChange("previousSoftware", e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cattler-green"
                      required
                    >
                      <option value="">Selecione uma opção</option>
                      {previousSoftwareOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="feedlotCapacity" className="font-lato text-cattler-navy">
                      Capacidade do confinamento (número de cabeças) *
                    </Label>
                    <select
                      id="feedlotCapacity"
                      value={feedlotData.feedlotCapacity}
                      onChange={(e) => handleInputChange("feedlotCapacity", e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cattler-green"
                      required
                    >
                      <option value="">Selecione a faixa de capacidade</option>
                      <option value="1-500">1 - 500 cabeças</option>
                      <option value="501-1000">501 - 1,000 cabeças</option>
                      <option value="1001-2500">1,001 - 2,500 cabeças</option>
                      <option value="2501-5000">2,501 - 5,000 cabeças</option>
                      <option value="5001-10000">5,001 - 10,000 cabeças</option>
                      <option value="10001-25000">10,001 - 25,000 cabeças</option>
                      <option value="25001-50000">25,001 - 50,000 cabeças</option>
                      <option value="50000+">50,000+ cabeças</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="additionalNotes" className="font-lato text-cattler-navy">
                      Observações Adicionais (Opcional)
                    </Label>
                    <Textarea
                      id="additionalNotes"
                      value={feedlotData.additionalNotes}
                      onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                      className="mt-1"
                      placeholder="Conte-nos qualquer outra coisa sobre sua operação que possa nos ajudar a atendê-lo melhor..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-cattler-orange hover:bg-cattler-orange/90 text-white font-lato font-bold py-3"
                disabled={!isFormValid() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Configurando sua conta...
                  </>
                ) : (
                  "Concluir Configuração"
                )}
              </Button>
            </form>
          </div>

          {/* Right Column - Summary & Info */}
          <div className="space-y-6">
            {/* Account Summary */}
            <Card className="bg-white border border-cattler-teal/30">
              <CardHeader>
                <CardTitle className="text-xl font-barlow text-cattler-navy">Resumo da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-cattler-light-teal/10 p-4 rounded-lg">
                  <h4 className="font-lato font-medium text-cattler-navy mb-2">Informações do Cliente</h4>
                  <div className="space-y-1 text-sm font-roboto text-cattler-navy/80">
                    <p>{paymentData.customerInfo.name}</p>
                    <p>{paymentData.customerInfo.email}</p>
                    <p>{paymentData.customerInfo.company}</p>
                  </div>
                </div>

                <div className="bg-cattler-green/10 p-4 rounded-lg">
                  <h4 className="font-lato font-medium text-cattler-navy mb-2">Plano Selecionado</h4>
                  <div className="space-y-1 text-sm font-roboto text-cattler-navy/80">
                    <p className="font-medium">{paymentData.plan.name}</p>
                    <p>
                      {paymentData.plan.pens} • {paymentData.plan.users}
                    </p>

                    {/* Show promotional info if applicable */}
                    {paymentData.promotionalState?.saleActive && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                        <div className="flex items-center gap-1">
                          <Badge className="bg-red-500 text-white text-xs animate-pulse">
                            {paymentData.promotionalState.saleName}
                          </Badge>
                          <span className="text-xs text-red-700">Desconto aplicado!</span>
                        </div>
                      </div>
                    )}

                    {/* Show selected add-ons */}
                    {paymentData.addOns && paymentData.addOns.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-cattler-green/20">
                        <p className="text-xs font-medium text-cattler-navy mb-1">Complementos:</p>
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
                            <p key={index} className="text-xs">
                              • {addOn.name}
                              {addOn.id === "usuarios-clientes" &&
                                paymentData.additionalClientUsers > 0 &&
                                ` (${paymentData.additionalClientUsers})`}
                            </p>
                          )
                        })}
                      </div>
                    )}
                    {/* Mostrar usuarios y corrales adicionales */}
                    {(paymentData.additionalPens > 0 || paymentData.additionalUsers > 0) && (
                      <div className="mt-2 space-y-1">
                        {paymentData.additionalPens > 0 && (
                          <p className="text-xs">+{paymentData.additionalPens} currais adicionais</p>
                        )}
                        {paymentData.additionalUsers > 0 && (
                          <p className="text-xs">+{paymentData.additionalUsers} usuários adicionais</p>
                        )}
                      </div>
                    )}
                    <p className="text-cattler-green font-bold">
                      R${paymentData.total}
                      {paymentData.billingCycle === "monthly" ? "/mês" : "/ano"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card className="bg-white border border-cattler-teal/30">
              <CardHeader>
                <CardTitle className="text-xl font-barlow text-cattler-navy flex items-center">
                  <Users className="h-5 w-5 mr-2" />O Que Acontece Depois?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-cattler-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-bold text-xs">1</span>
                    </div>
                    <div>
                      <h4 className="font-lato font-medium text-cattler-navy text-sm">Configuração da Conta</h4>
                      <p className="text-xs font-roboto text-cattler-navy/70">
                        Criaremos sua conta FEEDER com a configuração do seu plano
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-cattler-teal rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-bold text-xs">2</span>
                    </div>
                    <div>
                      <h4 className="font-lato font-medium text-cattler-navy text-sm">Email de Boas-vindas</h4>
                      <p className="text-xs font-roboto text-cattler-navy/70">
                        Credenciais de login e guia de início enviados para seu email
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-cattler-navy rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-bold text-xs">3</span>
                    </div>
                    <div>
                      <h4 className="font-lato font-medium text-cattler-navy text-sm">Ligação de Integração</h4>
                      <p className="text-xs font-roboto text-cattler-navy/70">
                        Nossa equipe agendará uma ligação para ajudá-lo a começar
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Info */}
            <Alert className="border-cattler-green/30 bg-cattler-green/5">
              <AlertDescription className="text-cattler-navy">
                <strong>Precisa de ajuda?</strong> Nossa equipe de suporte está disponível de segunda a sexta, das 8h às
                18h (horário central).
                <br />
                Email: support@cattler.com | Telefone: +1 (555) 123-4567
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  )
}
