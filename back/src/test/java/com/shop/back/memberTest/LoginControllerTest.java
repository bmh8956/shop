import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc // 컨트롤러 테스트 
@Transactional //데이터 변환x
public class LoginControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testLoginEndpoint() throws Exception {
        // 요청에 필요한 데이터 설정
        String requestBody = "{\"username\": \"testUser\", \"password\": \"testPassword\"}";

        // 요청 보내기
        mockMvc.perform(MockMvcRequestBuilders.post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists()) // 응답에서 id가 존재하는지 확인
                .andExpect(MockMvcResultMatchers.jsonPath("$.jwt").exists()); // 응답에서 jwt가 존재하는지 확인
    }
}
