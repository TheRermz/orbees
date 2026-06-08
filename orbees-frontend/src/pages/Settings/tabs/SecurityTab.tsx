import { useState } from "react";
import { Lock, Dot, Eye, EyeOff } from "lucide-react";
import { Button } from "../../../components/ui";
import {
  PanelTitle,
  Section,
  Field,
  FieldLabel,
  StyledInput,
  PasswordInputWrapper,
  PasswordToggle,
  FormActions,
  TipsCard,
  TipsTitle,
  TipItem,
} from "../SettingsPage.styles";
import { TIPS } from "../constants";
import { useUser } from "../../../hooks/useUser";
import { useToast } from "../../../contexts/useToast";

export const SecurityTab = () => {
  const [current, setCurrent] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { updatePassword, loading } = useUser();
  const { showToast } = useToast();

  const validate = (pwd: string): string | null => {
    if (pwd.length < 8) return "Mínimo 8 caracteres.";
    if (!/[A-Z]/.test(pwd))
      return "Deve conter pelo menos uma letra maiúscula.";
    if (!/[^a-zA-Z0-9]/.test(pwd))
      return "Deve conter pelo menos um caractere especial.";
    return null;
  };

  const handleSubmit = async () => {
    const validationErr = validate(newPwd);
    if (validationErr) {
      showToast("error", validationErr);
      return;
    }
    if (newPwd !== confirm) {
      showToast("error", "As senhas não coincidem.");
      return;
    }
    const errorMsg = await updatePassword({
      currentPassword: current,
      newPassword: newPwd,
    });
    if (!errorMsg) {
      showToast("success", "Senha atualizada com sucesso.");
      setCurrent("");
      setNewPwd("");
      setConfirm("");
    } else {
      showToast("error", errorMsg);
    }
  };

  return (
    <>
      <PanelTitle>
        <Lock size={18} /> Redefinir senha
      </PanelTitle>
      <Section>
        <Field>
          <FieldLabel>SENHA ATUAL</FieldLabel>
          <PasswordInputWrapper>
            <StyledInput
              type={showCurrent ? "text" : "password"}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              style={{ paddingRight: 40 }}
            />
            <PasswordToggle onClick={() => setShowCurrent((p) => !p)}>
              {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
            </PasswordToggle>
          </PasswordInputWrapper>
        </Field>

        <Field>
          <FieldLabel>NOVA SENHA</FieldLabel>
          <PasswordInputWrapper>
            <StyledInput
              type={showNew ? "text" : "password"}
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              style={{ paddingRight: 40 }}
            />
            <PasswordToggle onClick={() => setShowNew((p) => !p)}>
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </PasswordToggle>
          </PasswordInputWrapper>
        </Field>

        <Field>
          <FieldLabel>CONFIRMAR NOVA SENHA</FieldLabel>
          <PasswordInputWrapper>
            <StyledInput
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repita a nova senha"
              style={{ paddingRight: 40 }}
            />
            <PasswordToggle onClick={() => setShowConfirm((p) => !p)}>
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </PasswordToggle>
          </PasswordInputWrapper>
        </Field>

        <FormActions>
          <Button
            loading={loading}
            onClick={handleSubmit}
            disabled={!current || !newPwd || !confirm}
          >
            Redefinir senha
          </Button>
        </FormActions>

        <TipsCard>
          <TipsTitle>Dicas de segurança</TipsTitle>
          {TIPS.map((tip) => (
            <TipItem key={tip}>
              <Dot size={16} color="#9ca3af" /> {tip}
            </TipItem>
          ))}
        </TipsCard>
      </Section>
    </>
  );
};
