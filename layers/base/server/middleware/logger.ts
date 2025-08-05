export default defineLazyEventHandler(async () => {
  const storage = useStorage('db')

  return defineEventHandler(async (event) => {
    await storage.setItem(`telemetry:request:${Date.now()}`, {
      url: getRequestURL(event),
      method: event.method,
      headers: getRequestHeaders(event),
    })
  })
})
