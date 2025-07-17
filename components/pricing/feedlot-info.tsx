"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Building2, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePricingTranslation } from "@/hooks/use-pricing-translation";
import { CountrySelector } from "@/components/country-selector";
import { Textarea } from "@/components/ui/textarea";

interface FeedlotInfoProps {
  paymentData: any;
  onBack: () => void;
  onComplete: (feedlotData: any) => void;
}

export default function FeedlotInfo({
  paymentData,
  onBack,
  onComplete,
}: FeedlotInfoProps) {
  const { t, formatPrice, selectedCountry, setSelectedCountry, isHydrated } =
    usePricingTranslation();
  const [feedlotData, setFeedlotData] = useState({
    companyName: paymentData?.customerInfo?.company || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Brasil",
    totalCapacity: "",
    currentHeadCount: "",
    operationType: "confinamento",
    startDate: "",
    previousFeedingSoftware: "",
    howDidYouHear: "",
    additionalNotes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFeedlotData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(feedlotData);
  };

  const isFormValid =
    feedlotData.companyName &&
    feedlotData.address &&
    feedlotData.city &&
    feedlotData.state &&
    feedlotData.totalCapacity &&
    feedlotData.currentHeadCount &&
    feedlotData.previousFeedingSoftware &&
    feedlotData.howDidYouHear;

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cattler-green mx-auto mb-4"></div>
          <p className="text-cattler-navy font-lato">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20">
      <div className="container mx-auto px-4 py-8">
        {/* Country Selector - Hidden for production, only available in debug */}
        {/* <div className="flex justify-end mb-4">
          <CountrySelector
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
          />
        </div> */}

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
          <h1 className="text-3xl md:text-4xl font-bold font-barlow text-cattler-navy">
            {t("feedlotInfoTitle")}
          </h1>
          <p className="text-lg font-lato text-cattler-navy/80 mt-2">
            {t("feedlotInfoSubtitle")}
          </p>
          <Badge className="mt-2 bg-cattler-navy text-white">
            Etapa 3 de 3
          </Badge>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white border border-cattler-teal/30">
                <CardHeader>
                  <CardTitle className="text-xl font-barlow text-cattler-navy flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-cattler-teal" />
                    Dados da Propriedade
                  </CardTitle>
                  <CardDescription className="font-roboto text-cattler-navy/70">
                    Informações básicas sobre sua operação de confinamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Company Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-lato font-medium text-cattler-navy flex items-center">
                        <Building2 className="h-4 w-4 mr-2" />
                        {t("companyInfo")}
                      </h3>

                      <div>
                        <Label
                          htmlFor="companyName"
                          className="font-lato text-cattler-navy"
                        >
                          {t("companyName")} *
                        </Label>
                        <Input
                          id="companyName"
                          value={feedlotData.companyName}
                          onChange={(e) =>
                            handleInputChange("companyName", e.target.value)
                          }
                          className="mt-1"
                          placeholder="Fazenda São João"
                          required
                        />
                      </div>
                    </div>

                    {/* Location Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-lato font-medium text-cattler-navy flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {t("location")}
                      </h3>

                      <div>
                        <Label
                          htmlFor="address"
                          className="font-lato text-cattler-navy"
                        >
                          {t("address")} *
                        </Label>
                        <Input
                          id="address"
                          value={feedlotData.address}
                          onChange={(e) =>
                            handleInputChange("address", e.target.value)
                          }
                          className="mt-1"
                          placeholder="Rua das Fazendas, 123"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label
                            htmlFor="city"
                            className="font-lato text-cattler-navy"
                          >
                            {t("city")} *
                          </Label>
                          <Input
                            id="city"
                            value={feedlotData.city}
                            onChange={(e) =>
                              handleInputChange("city", e.target.value)
                            }
                            className="mt-1"
                            placeholder="São Paulo"
                            required
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="state"
                            className="font-lato text-cattler-navy"
                          >
                            {t("state")} *
                          </Label>
                          <Input
                            id="state"
                            value={feedlotData.state}
                            onChange={(e) =>
                              handleInputChange("state", e.target.value)
                            }
                            className="mt-1"
                            placeholder="SP"
                            required
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="zipCode"
                            className="font-lato text-cattler-navy"
                          >
                            {t("zipCode")}
                          </Label>
                          <Input
                            id="zipCode"
                            value={feedlotData.zipCode}
                            onChange={(e) =>
                              handleInputChange("zipCode", e.target.value)
                            }
                            className="mt-1"
                            placeholder="01234-567"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Operation Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-lato font-medium text-cattler-navy flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {t("operationInfo")}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="totalCapacity"
                            className="font-lato text-cattler-navy"
                          >
                            {t("totalCapacity")} *
                          </Label>
                          <Input
                            id="totalCapacity"
                            type="number"
                            value={feedlotData.totalCapacity}
                            onChange={(e) =>
                              handleInputChange("totalCapacity", e.target.value)
                            }
                            className="mt-1"
                            placeholder="1000"
                            required
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="currentHeadCount"
                            className="font-lato text-cattler-navy"
                          >
                            {t("currentHeadCount")} *
                          </Label>
                          <Input
                            id="currentHeadCount"
                            type="number"
                            value={feedlotData.currentHeadCount}
                            onChange={(e) =>
                              handleInputChange(
                                "currentHeadCount",
                                e.target.value
                              )
                            }
                            className="mt-1"
                            placeholder="750"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="startDate"
                          className="font-lato text-cattler-navy"
                        >
                          {t("startDate")}
                        </Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={feedlotData.startDate}
                          onChange={(e) =>
                            handleInputChange("startDate", e.target.value)
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {/* Previous Software & How Did You Hear */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-lato font-medium text-cattler-navy flex items-center">
                        <Building2 className="h-4 w-4 mr-2" />
                        Informações Adicionais
                      </h3>

                      <div>
                        <Label
                          htmlFor="previousFeedingSoftware"
                          className="font-lato text-cattler-navy"
                        >
                          {t("previousSoftware")} *
                        </Label>
                        <select
                          id="previousFeedingSoftware"
                          value={feedlotData.previousFeedingSoftware}
                          onChange={(e) =>
                            handleInputChange(
                              "previousFeedingSoftware",
                              e.target.value
                            )
                          }
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cattler-green"
                          required
                        >
                          <option value="">Selecione uma opção</option>
                          <option value="No Feeding Software">
                            {t("software.none")}
                          </option>
                          <option value="Performance Beef">
                            {t("software.performanceBeef")}
                          </option>
                          <option value="Nutron">{t("software.nutron")}</option>
                          <option value="Other">{t("software.other")}</option>
                        </select>
                      </div>

                      <div>
                        <Label
                          htmlFor="howDidYouHear"
                          className="font-lato text-cattler-navy"
                        >
                          {t("howDidYouHear")} *
                        </Label>
                        <select
                          id="howDidYouHear"
                          value={feedlotData.howDidYouHear}
                          onChange={(e) =>
                            handleInputChange("howDidYouHear", e.target.value)
                          }
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cattler-green"
                          required
                        >
                          <option value="">Selecione uma opção</option>
                          <option value="Google Search">Pesquisa Google</option>
                          <option value="Social Media">Redes Sociais</option>
                          <option value="Industry Conference">
                            Conferência do Setor
                          </option>
                          <option value="Colleague Referral">
                            Indicação de Colega
                          </option>
                          <option value="Trade Publication">
                            Publicação Especializada
                          </option>
                          <option value="Sales Representative">
                            Representante de Vendas
                          </option>
                          <option value="Existing Customer">
                            Cliente Existente
                          </option>
                          <option value="Other">Outro</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="additionalNotes"
                        className="font-lato text-cattler-navy"
                      >
                        Observações Adicionais
                      </Label>
                      <Textarea
                        id="additionalNotes"
                        value={feedlotData.additionalNotes}
                        onChange={(e) =>
                          handleInputChange("additionalNotes", e.target.value)
                        }
                        className="mt-1"
                        placeholder="Conte-nos mais sobre suas necessidades específicas..."
                        rows={4}
                      />
                    </div>

                    <div className="pt-6">
                      <Button
                        type="submit"
                        disabled={!isFormValid}
                        className="w-full bg-cattler-orange hover:bg-cattler-orange/90 text-white font-lato font-bold py-3"
                      >
                        Finalizar Configuração
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-white border border-cattler-green/30 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg font-barlow text-cattler-navy">
                    Resumo do Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-lato font-medium text-cattler-navy">
                      {paymentData?.plan?.name}
                    </h4>
                    <p className="text-sm font-roboto text-cattler-navy/70">
                      {paymentData?.plan?.description}
                    </p>
                    <p className="text-lg font-bold font-barlow text-cattler-green mt-2">
                      R$ {paymentData?.total} /{" "}
                      {paymentData?.billingCycle === "annual" ? "ano" : "mês"}
                    </p>
                  </div>

                  {paymentData?.addOns?.length > 0 && (
                    <div>
                      <h5 className="font-lato font-medium text-cattler-navy text-sm mb-2">
                        Complementos:
                      </h5>
                      {paymentData.addOns.map(
                        (addonId: string, index: number) => (
                          <p
                            key={index}
                            className="text-sm font-roboto text-cattler-navy/70"
                          >
                            • {addonId}
                          </p>
                        )
                      )}
                    </div>
                  )}

                  <div className="pt-4 border-t border-cattler-teal/20">
                    <p className="text-sm font-roboto text-cattler-navy/70">
                      Após finalizar, você receberá acesso imediato ao sistema e
                      instruções de configuração.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
