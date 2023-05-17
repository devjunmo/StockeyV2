import { memo, useEffect, useState, useMemo } from "react"
import styled from "styled-components"
import TradeBuySellBar from "./TradeBuySellBar"

import { getEmptyImage } from "react-dnd-html5-backend"
import { useDrag } from "react-dnd"
import { TradeStockItemProps } from "./TradeStockList"
import { Grid } from "@mui/material"
import { useOrderStatus } from "../../../hooks/useTradeForm"

interface ExpectedProfitProps {
  expectedProfit: number
}

const TradeStockItem = ({ item }: TradeStockItemProps) => {
  // 숫자 포맷
  const internationalNumberFormat = new Intl.NumberFormat("en-US")
  const type = item.buyPrice != null ? "SELL" : "BUY"
  const [{ isDragging }, dragRef, previewRef] = useDrag(
    () => ({
      type,
      item,
      collect: (monitor) => ({
        //isDragging 변수가 현재 드래깅중인지 아닌지를 리턴
        isDragging: monitor.isDragging(),
      }),
    }),
    [item]
  )

  const [isHover, setIsHover] = useState(false)
  const [expectedProfit, setExpectedProfit] = useState<number>(0)

  // buy, sell 주문 현황
  const { data, isSuccess, refetch } = useOrderStatus(item.id)

  useEffect(() => {
    previewRef(getEmptyImage(), { captureDraggingState: true })
    if (item.stockNums) {
      const expectedProfit =
        item.stockNums * (item.currentPrice - item.buyPrice!)
      setExpectedProfit(expectedProfit)
    }
  }, [])

  const hoverControlHandler = (status: boolean) => {
    setIsHover(status)
  }

  return (
    <>
      <StockItemContainer
        onMouseEnter={() => hoverControlHandler(true)}
        onMouseLeave={() => hoverControlHandler(false)}
        ref={dragRef}
      >
        <StockItemWrapper
          container
          direction="row"
          columns={15}
          opacity={`${isDragging ? 0.4 : 1}`}
        >
          <StockTitle item xs={5}>
            <StockInfo>
              <StockImage src={`/logo_images/${item.name}.png`} />
            </StockInfo>

            <StockInfo>
              <InfoText>{item.name}</InfoText>
              {item.buyPrice && <SubText>{item.stockNums}주</SubText>}
            </StockInfo>
          </StockTitle>

          <StockInfo item xs={3}>
            <SubText>현재가</SubText>
            <InfoText>
              {internationalNumberFormat.format(item.currentPrice)}
            </InfoText>
          </StockInfo>

          {item.buyPrice && (
            <>
              <StockInfo item xs={3}>
                <SubText>매입 단가</SubText>
                <InfoText>
                  {internationalNumberFormat.format(item.buyPrice)}
                </InfoText>
              </StockInfo>
              <StockInfo item xs={4}>
                <SubText>예상 수익</SubText>
                <ExpectedProfitText expectedProfit={expectedProfit}>
                  {expectedProfit > 0
                    ? `+${internationalNumberFormat.format(expectedProfit)}`
                    : `${internationalNumberFormat.format(expectedProfit)}`}
                </ExpectedProfitText>
              </StockInfo>
            </>
          )}
        </StockItemWrapper>
        {isHover && isSuccess && (
          <TradeBuySellBar buyPop={data.buy} sellPop={data.sell} />
        )}
      </StockItemContainer>
    </>
  )
}

export default memo(TradeStockItem)

const StockItemContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`

const StockItemWrapper = styled(Grid)<{ opacity: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  opacity: ${(props) => props.opacity};
`

const StockImage = styled.img`
  width: 80%;
  height: 100%;
  border-radius: 16px;
`
const StockTitle = styled(Grid)`
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
`
const StockInfo = styled(Grid)`
  width: 50%;
`

const InfoText = styled.p`
  font-size: 10px;
  font-weight: bold;
  margin: 1px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const SubText = styled.p`
  font-size: 8px;
  margin: 1px;
`

const ExpectedProfitText = styled.p<ExpectedProfitProps>`
  color: ${(prop) => (prop.expectedProfit > 0 ? "red" : "blue")};
  font-size: 12px;
  font-weight: bold;
  margin: 1px;
`
