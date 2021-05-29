import com.example.pizza.PizzaApplication;
import com.example.pizza.payload.MenuResponse;
import com.example.pizza.payload.ProductResponse;
import com.example.pizza.service.MenuService;
import com.example.pizza.service.ProductService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@SpringBootTest(
        classes = PizzaApplication.class
)
@ActiveProfiles("test")
@RunWith(SpringJUnit4ClassRunner.class)
public class MenuTest {

    @Autowired
    private MenuService menuService;

    @Test
    public void getMenus() {
        List<MenuResponse> menuResponses = menuService.getAllMenu();

        Assert.assertEquals(menuResponses.size(),15);
    }

}
