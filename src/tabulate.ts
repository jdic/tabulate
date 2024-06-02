import type { TabulateData } from './types/DTabulate'
import Table from 'cli-table3'
import 'colors'

const stripColorCodes = (str: string): string =>
  str.replace(/\u001B\[\d+m/g, '')

export const tabulate = (func: TabulateData, start: number, end: number, increment = 0.5) =>
{
  const table = new Table({ head: ['x', 'f()'], colWidths: [10, 10] })
  const data: Array<[string | number, string | number]> = []

  for (let x = start; x < end + increment; x += increment)
  {
    let y = func(x)

    if(isNaN(y))
    {
      data.push([x.toString().blue, 'Ind'.blue])
      const nearbyValues = [-0.1, -0.01, -0.001, 0.001, 0.01, 0.1]

      for (let i = 0; i < nearbyValues.length; i++)
      {
        const nearbyX = x + nearbyValues[i]
        y = func(nearbyX)

        data.push([nearbyX.toString().red, y])
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
    table.push([x.toString().padEnd(2), y.toString().padEnd(2).substring(0, 8)])
  })

  console.log(table.toString())
}