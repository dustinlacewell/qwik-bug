import { qwikify$ } from "@builder.io/qwik-react"
import { CanvasTest } from "@ldlework/demo-lib-react";

export const RCanvasTest = qwikify$(CanvasTest, { clientOnly: true });