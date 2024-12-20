import com.S2O.webapp.Entity.Role;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;

public class RoleDeserializer extends JsonDeserializer<Role> {
    @Override
    public Role deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String roleName = p.getText();
        Role role = new Role();
        role.setAuthority(roleName); // Set the authority field based on the string
        return role;
    }
}