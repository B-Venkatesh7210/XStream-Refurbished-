import React, { useState, useEffect } from "react";
import LandingPage from "./landingPage";
import ClientOnly from "./clientOnly";

export default function Home() {
  return (
    <ClientOnly>
      <LandingPage></LandingPage>
    </ClientOnly>
  );
}
