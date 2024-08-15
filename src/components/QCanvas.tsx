import { component$, useVisibleTask$, useSignal, $, noSerialize, type QRL } from '@builder.io/qwik'

interface CanvasProps {
  setup?: QRL<(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void>
  draw?: QRL<(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, frameCount: number) => void>
}

// interface Dimensions {
//   width: number
//   height: number
// }

export const QCanvas = component$<CanvasProps>(({ setup, draw }) => {
  const containerRef = useSignal<HTMLDivElement>()
  const canvasRef = useSignal<HTMLCanvasElement>()
  const frameCount = useSignal(0)
  const renderer = useSignal<QRL<() => void>>()

  useVisibleTask$(async ({ cleanup }) => {
    const container = containerRef.value
    const canvas = canvasRef.value

    if (!canvas) return
    if (!container) return

    const ctx = noSerialize(canvas.getContext('2d')!)
    if (!ctx) return

    // let animationFrameId: number;

    const handleResize = $(() => {
      const scale = window.devicePixelRatio
      const width = container.clientWidth
      const height = container.clientHeight
      canvas.width = width * scale
      canvas.height = height * scale
      ctx.scale(scale, scale)
    })

    renderer.value = $(function () {
      frameCount.value++
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      if (draw) {
        draw(ctx, canvas, frameCount.value)
      }

      window.requestAnimationFrame(async () => await renderer.value!())
    })

    await handleResize()
    window.addEventListener('resize', () => handleResize())

    if (setup) {
      await setup(ctx, canvas)
    }

    await renderer.value()

    cleanup(() => {
      window.removeEventListener('resize', () => handleResize())
      // window.cancelAnimationFrame(animationFrameId);
    })
  })

  return (
    <div ref={containerRef} class={[
        "canvas-container overflow-hidden",
        "w-full h-full",
        "flex flex-col",
        "items-stretch justify-stretch"
      ]}>
      <canvas
        ref={canvasRef}
      />
    </div>
  )
})