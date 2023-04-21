export async function getResource(url, msg = 'Something going wrong at ') {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`${msg} ${url}, received ${res.status}`)
  }
  return await res.json()
}
