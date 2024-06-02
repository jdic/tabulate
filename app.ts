import { tabulate } from './src/tabulate'
import type { TabulateData } from './src/types/DTabulate'

const func: TabulateData = (x: number) => x ** 2

tabulate(func, -5, 5)