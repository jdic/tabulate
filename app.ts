import Table from 'cli-table3'
import 'colors'

type TabulateData = (x: number) => number

const stripColorCodes = (str: string): string =>
  str.replace(/\u001B\[\d+m/g, '')

const tabulate = (func: TabulateData, start: number, end: number) =>
{
  const table = new Table({ head: ['x', 'f()'], colWidths: [10, 10] })
  const data: Array<[string | number, string | number]> = []

  for (let x = start; x < end + 0.5; x += 0.5)
  {
    let y = func(x)

    if(isNaN(y))
    {
      data.push([x.toString().blue, 'NaN'.blue])
      const nearbyValues = [-0.1, -0.01, -0.001, 0.001, 0.01, 0.1]

      for (let i = 0; i < nearbyValues.length; i++)
      {
        const nearbyX = x + nearbyValues[i] * (x < 0 && nearbyValues[i] < 0 ? -1 : 1)
        y = func(nearbyX)

        data.push([nearbyX.toString().padEnd(2).red, y.toFixed(4)])
      }
    }

    else
    {
      data.push([x, y])
    }
  }

  data.sort((a, b) =>
  {
    const numA = typeof a[0] === 'string' ? parseFloat(stripColorCodes(a[0] as string)) : a[0] as number
    const numB = typeof b[0] === 'string' ? parseFloat(stripColorCodes(b[0] as string)) : b[0] as number

    return numA - numB
  })

  data.forEach(([x, y]) =>
  {
    table.push([x.toString().padEnd(2), y.toString().padEnd(2)])
  })

  console.log(table.toString())
}

const fx: TabulateData = x => ((x ** 4) - 16) / (x - 2)

tabulate(fx, -3, 3)