"use client";

import { useState } from "react";
import { type PartnerLogo } from "@/hooks/use-partner-logos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Edit } from "lucide-react";

export default function LogoManagement() {
  const [selectedCountry, setSelectedCountry] = useState<string>("US");
  const [editingLogo, setEditingLogo] = useState<PartnerLogo | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [logoData, setLogoData] = useState<CountryLogos>(PartnerLogo);

  const [formData, setFormData] = useState({
    name: "",
    logoUrl: "",
    website: "",
    category: "producer" as PartnerLogo["category"],
  });

  const countries = [
    { code: "US", name: "United States" },
    { code: "AR", name: "Argentina" },
    { code: "BR", name: "Brazil" },
    { code: "default", name: "Default/Other Countries" },
  ];

  const categories = [
    {
      value: "producer",
      label: "Producer",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "technology",
      label: "Technology",
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "investor",
      label: "Investor",
      color: "bg-purple-100 text-purple-800",
    },
    {
      value: "partner",
      label: "Partner",
      color: "bg-orange-100 text-orange-800",
    },
  ];

  const handleSave = () => {
    if (!formData.name || !formData.logoUrl) return;

    const newLogo: PartnerLogo = {
      id: editingLogo?.id || `${selectedCountry}-${Date.now()}`,
      name: formData.name,
      logoUrl: formData.logoUrl,
      website: formData.website,
      category: formData.category,
    };

    const updatedLogos = { ...logoData };
    if (!updatedLogos[selectedCountry]) {
      updatedLogos[selectedCountry] = [];
    }

    if (editingLogo) {
      const index = updatedLogos[selectedCountry].findIndex(
        (logo) => logo.id === editingLogo.id
      );
      if (index !== -1) {
        updatedLogos[selectedCountry][index] = newLogo;
      }
    } else {
      updatedLogos[selectedCountry].push(newLogo);
    }

    setLogoData(updatedLogos);
    resetForm();
  };

  const handleDelete = (logoId: string) => {
    const updatedLogos = { ...logoData };
    updatedLogos[selectedCountry] = updatedLogos[selectedCountry].filter(
      (logo) => logo.id !== logoId
    );
    setLogoData(updatedLogos);
  };

  const handleEdit = (logo: PartnerLogo) => {
    setEditingLogo(logo);
    setFormData({
      name: logo.name,
      logoUrl: logo.logoUrl,
      website: logo.website || "",
      category: logo.category,
    });
    setIsAddingNew(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      logoUrl: "",
      website: "",
      category: "producer",
    });
    setEditingLogo(null);
    setIsAddingNew(false);
  };

  const getCategoryStyle = (category: string) => {
    const categoryInfo = categories.find((cat) => cat.value === category);
    return categoryInfo?.color || "bg-gray-100 text-gray-800";
  };

  const currentLogos = logoData[selectedCountry] || [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Logo Management
        </h1>
        <p className="text-gray-600">
          Manage partner logos displayed in the carousel for each country
        </p>
      </div>

      <Tabs
        value={selectedCountry}
        onValueChange={setSelectedCountry}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          {countries.map((country) => (
            <TabsTrigger key={country.code} value={country.code}>
              {country.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {countries.map((country) => (
          <TabsContent key={country.code} value={country.code} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Logo List */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    Logos for {country.name} ({currentLogos.length})
                  </h2>
                  <Button
                    onClick={() => setIsAddingNew(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Logo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentLogos.map((logo) => (
                    <Card
                      key={logo.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge className={getCategoryStyle(logo.category)}>
                            {logo.category}
                          </Badge>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(logo)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(logo.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <img
                            src={logo.logoUrl || "/placeholder.svg"}
                            alt={logo.name}
                            className="h-10 w-auto max-w-[80px] object-contain"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm truncate">
                              {logo.name}
                            </h3>
                            {logo.website && (
                              <a
                                href={logo.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline truncate block"
                              >
                                {logo.website}
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {currentLogos.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <p>No logos added for {country.name} yet.</p>
                    <Button
                      onClick={() => setIsAddingNew(true)}
                      className="mt-4"
                    >
                      Add First Logo
                    </Button>
                  </div>
                )}
              </div>

              {/* Add/Edit Form */}
              {isAddingNew && (
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {editingLogo ? "Edit Logo" : "Add New Logo"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="name">Company Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Enter company name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="logoUrl">Logo URL</Label>
                        <Input
                          id="logoUrl"
                          value={formData.logoUrl}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              logoUrl: e.target.value,
                            })
                          }
                          placeholder="https://example.com/logo.png"
                        />
                      </div>

                      <div>
                        <Label htmlFor="website">Website (Optional)</Label>
                        <Input
                          id="website"
                          value={formData.website}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              website: e.target.value,
                            })
                          }
                          placeholder="https://company.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value: PartnerLogo["category"]) =>
                            setFormData({ ...formData, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.logoUrl && (
                        <div>
                          <Label>Preview</Label>
                          <div className="border rounded p-4 bg-gray-50 flex items-center justify-center">
                            <img
                              src={formData.logoUrl || "/placeholder.svg"}
                              alt="Preview"
                              className="h-12 w-auto max-w-[120px] object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button onClick={handleSave} className="flex-1">
                          {editingLogo ? "Update" : "Add"} Logo
                        </Button>
                        <Button variant="outline" onClick={resetForm}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
