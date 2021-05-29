import com.example.pizza.PizzaApplication;
import com.example.pizza.payload.EmployeeResponse;
import com.example.pizza.payload.OrderRequest;
import com.example.pizza.payload.OrderResponse;
import com.example.pizza.service.EmployeeService;
import com.example.pizza.service.OrderService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest(
        classes = PizzaApplication.class
)
@ActiveProfiles("test")
@RunWith(SpringJUnit4ClassRunner.class)
public class OrderTest {

    @Autowired
    private OrderService orderService;

    @Test
    public void getOrders() {
        List<OrderResponse> orders = orderService.getAllOrders();

        Assert.assertEquals(orders.size(),0);
    }

    @Test
    public void createOrder() {
        OrderRequest orderRequest = new OrderRequest(
                (long) 1,
                "+7",
                "Moscow",
                null,
                null
        );
        orderService.createOrder(orderRequest);

        List<OrderResponse> orders = orderService.getAllOrders();

        Assert.assertEquals(orders.size(),1);
    }
}
