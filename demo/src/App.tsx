import logo from './logo.svg'
import './App.css'
import styled from 'styled-components'
// import 'antd/dist/antd.css'
import { observer } from 'mobx-react-lite'
import { Divider, Typography, Row, Col, ConfigProvider, theme } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
const { Title } = Typography
import { LineChart } from './components/LineChart'
import { BarChart } from './components/BarChart'
import { PieChart } from './components/PieChart'
import { StackChart } from './components/StackChart'
import { ScatterChart } from './components/ScatterChart'
import { WordcloudChart } from './components/WordcloudChart'
import { BarHorizontalChart } from './components/BarHorizontalChart'
import { TableChart } from './components/TableChart'
import { theme as themeStore } from './store'

const Wrapper = styled.div`
  padding: 20px;
`

const App = observer(() => {
  return (
    <ConfigProvider
      theme={{
        algorithm: themeStore.value === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm
      }}
    >
      <Wrapper
        style={{ backgroundColor: themeStore.value === 'light' ? '#fff' : 'rgba(4,8,16,1)' }}
      >
        <header className="App-header">
          <Row>
            <Col span={12}>
              <Title style={{ margin: 0 }}>echarts-readymade</Title>
            </Col>
            <Col
              span={12}
              style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
            >
              <Title
                level={3}
                style={{ textAlign: 'right', cursor: 'pointer', margin: 0 }}
                onClick={() => {
                  themeStore.set(themeStore.value === 'light' ? 'dark' : 'light')
                }}
              >
                {themeStore.value === 'light' ? <SunOutlined /> : <MoonOutlined />}
              </Title>
            </Col>
          </Row>
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
    </ConfigProvider>
  )
})

export default App
