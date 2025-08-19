"use client";

import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import ExpandableVideoSection from "@/components/expandable-video-section";

export default function VideoCtaSection() {
  const { t } = useTranslation();

  return (
    <ExpandableVideoSection
      videoUrl={t("presentationVideoUrl")}
      title={t("videoCtaTitle")}
      subtitle={t("videoCtaSubtitle")}
    />
  );
}
