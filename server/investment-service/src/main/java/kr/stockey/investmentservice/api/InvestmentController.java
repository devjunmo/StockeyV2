package kr.stockey.investmentservice.api;

import kr.stockey.investmentservice.api.request.OrderRequest;
import kr.stockey.investmentservice.dto.*;
import kr.stockey.investmentservice.mapper.InvestmentDtoMapper;
import kr.stockey.investmentservice.service.InvestmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/investment")
@RequiredArgsConstructor
public class InvestmentController {

    private final InvestmentService investmentService;
    private final InvestmentDtoMapper investmentDtoMapper;

    /*
        주문 제출
     */
    @PostMapping("/order")
    public ResponseEntity<ResponseDto> takeStockOrder(@RequestBody List<OrderRequest> orderRequests) throws Exception {
        List<OrderListDto> orderListDto = investmentDtoMapper.toOrderListDto(orderRequests);
        OrderProducerDto orderProducerDto = new OrderProducerDto(getMemberId(), orderListDto, LocalDateTime.now());
        investmentService.takeStockOrder(orderProducerDto);
        return new ResponseEntity<>(new ResponseDto("주문 제출 완료!", null), HttpStatus.OK);
    }

    /*
        주문 제출 여부 확인
     */
    @GetMapping("/order/check")
    public ResponseEntity<ResponseDto> checkOrderSubmit() throws Exception {
        Boolean checked = investmentService.checkOrderSubmit(getMemberId());
        return new ResponseEntity<>(new ResponseDto("주문 여부 확인 완료!", checked), HttpStatus.OK);
    }

    /*
        내가 주문한 history 제공
     */
    @GetMapping("/orders")
    public ResponseEntity<ResponseDto> getOrderHistory() throws Exception {
        List<ContractDto> ordersHistory = investmentService.getOrderHistory(getMemberId());
        return new ResponseEntity<>(new ResponseDto("주문 내역 제공 완료!", ordersHistory), HttpStatus.OK);
    }

    /*
        내 계좌 정보 가져오기 (총자산, 주식, 예수금)
     */
    @GetMapping
    public ResponseEntity<ResponseDto> getMyAccount() throws Exception {
        AccountDto accountDto = investmentService.getMyAccount(getMemberId());
        return new ResponseEntity<>(new ResponseDto("내 계좌 정보 제공 완료!", accountDto), HttpStatus.OK);
    }


    /*
        http 헤더에서 member id 가져오는 메소드
     */
    private Long getMemberId() throws Exception {
        // http 헤더에서 "X-UserId" 내용 가져와서 리턴하는 로직으로 채우기
        HttpServletRequest request
                = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String userId = request.getHeader("X-UserId");
        if (userId == null) {
            throw new Exception("서버에러!");
        }
        return Long.valueOf(userId);
    }
}