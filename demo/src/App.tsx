import logo from './logo.svg'
import './App.css'
import styled from 'styled-components'
import 'antd/dist/antd.css'
import { Divider, Typography, Row, Col } from 'antd'
const { Title } = Typography
import { LineChart } from './components/LineChart'
import { BarChart } from './components/BarChart'

const Wrapper = styled.div`
  padding: 20px;
`

function App() {
  return (
    <Wrapper>
      <header className="App-header">
        <Title>echarts-readymade</Title>
        <Divider />
        <Row gutter={16}>
          <Col span={12}>
            <LineChart />
          </Col>
          <Col span={12}>
            <BarChart />
          </Col>
        </Row>
      </header>
    </Wrapper>
  )
}

export default App
