import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    validate: {
      firstName: (val) => (val ? null : "Invalid first name"),
      lastName: (val) => (val ? null : "Invalid last name"),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      terms: (val) => (val ? null : "You have to accept the terms and conditions")
    },
  });

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      {/* <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?
        <Anchor href="#" size="sm" onClick={(event) => event.preventDefault()}>
          Create account
        </Anchor>
      </Text> */}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(() => {
            navigate("/menu");
          })}
        >
          <TextInput
            label="First Name"
            placeholder="Your first name"
            onChange={(event) =>
              form.setFieldValue("firstName", event.currentTarget.value)
            }
            error={form.errors.firstName}
          />

          <TextInput
            label="Last Name"
            placeholder="Your last name"
            mt="md"
            onChange={(event) =>
              form.setFieldValue("lastName", event.currentTarget.value)
            }
            error={form.errors.lastName}
          />

          <TextInput
            label="Email"
            placeholder="you@connexa.dev"
            mt="md"
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
          />
          <PasswordInput
            label="Password"
            autoComplete="off"
            placeholder="Your password"
            mt="md"
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password}
          />

          <Group position="apart" mt="md">
            <Checkbox label="I accept terms and conditions" 
            onChange={(event) =>
              form.setFieldValue("terms", event.currentTarget.value)
            }
            error={form.errors.terms}/>
          </Group>

          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>

          <Text color="dimmed" size="sm" align="center" mt={5}>
            {"Already have an account? "}
            <Anchor href="#" size="sm" onClick={(event) => navigate("/")}>
              {"Log in"}
            </Anchor>
          </Text>
        </form>
      </Paper>
    </Container>
  );
}
