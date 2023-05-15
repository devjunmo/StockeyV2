package kr.stockey.stockservice.client;

import kr.stockey.stockservice.dto.core.MemberDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "member-service")
public interface MemberClient {
    @GetMapping("/member/client/{memberId}")
    MemberDto getMember(@PathVariable("memberId") String memberId);
}