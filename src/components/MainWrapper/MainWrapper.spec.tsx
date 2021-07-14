import { render } from '@testing-library/react'

import { MainWrapper } from './index'

test('MainWrapper should renders', () => {
  const { getByText, getByAltText } = render(<MainWrapper />)

  expect(
    getByText('An Electron boilerplate including TypeScript, React, Jest and ESLint.')
  ).toBeTruthy()
  expect(getByAltText('ReactJS logo')).toBeTruthy()
})
