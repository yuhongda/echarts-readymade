import logo from './logo.svg'
import './App.css'
import styled from 'styled-components'
// import 'antd/dist/antd.css'
import { Divider, Typography, Row, Col } from 'antd'
const { Title } = Typography
import { LineChart } from './components/LineChart'
import { BarChart } from './components/BarChart'
import { PieChart } from './components/PieChart'
import { StackChart } from './components/StackChart'
import { ScatterChart } from './components/ScatterChart'
import { WordcloudChart } from './components/WordcloudChart'
import { BarHorizontalChart } from './components/BarHorizontalChart'
import { TableChart } from './components/TableChart'

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
          <Col span={24}>
            <LineChart />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <BarChart />
          </Col>
          <Col span={12}>
            <PieChart />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <StackChart />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <ScatterChart />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <WordcloudChart />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <BarHorizontalChart />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <TableChart />
          </Col>
        </Row>
      </header>
    </Wrapper>
  )
}

export default App
