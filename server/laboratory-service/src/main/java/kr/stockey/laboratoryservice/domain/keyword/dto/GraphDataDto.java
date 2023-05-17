package kr.stockey.laboratoryservice.domain.keyword.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GraphDataDto {
    private String keyword;
    private List<DotDto> line;
    private List<DotDto> scatter;

    @Builder
    public GraphDataDto(String keyword, List<DotDto> line, List<DotDto> scatter) {
        this.keyword = keyword;
        this.line = line;
        this.scatter = scatter;
    }
}
