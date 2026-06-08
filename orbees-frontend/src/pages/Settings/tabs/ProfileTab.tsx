import { useState, useRef } from "react";
import { User } from "lucide-react";
import { useAuthState } from "../../../contexts/useAuthContext";
import { Button } from "../../../components/ui";
import {
  PanelTitle,
  Section,
  AvatarRow,
  Avatar,
  AvatarInfo,
  AvatarLabel,
  AvatarHint,
  Field,
  FieldLabel,
  StyledInput,
  Chip,
  FormActions,
} from "../SettingsPage.styles";
import { useUser } from "../../../hooks/useUser";
import { useToast } from "../../../contexts/useToast";

export const ProfileTab = () => {
  const { user } = useAuthState();
  const { updateMe, updateProfilePicture, loading } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fullname, setFullname] = useState(user?.fullname ?? "");
  const { showToast } = useToast();

  const pfp = user?.profilePicturePath?.replace("-", "");
  const pfpUrl = pfp
    ? `${import.meta.env.VITE_API_BASE_URL?.replace("/api", "")}${pfp}`
    : null;

  const handleSave = async () => {
    const errorMsg = await updateMe({ fullname });
    if (!errorMsg) showToast("success", "Perfil atualizado com sucesso.");
    else showToast("error", errorMsg);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const errorMsg = await updateProfilePicture(file);
    if (!errorMsg) showToast("success", "Foto atualizada com sucesso.");
    else showToast("error", errorMsg);
  };

  return (
    <>
      <PanelTitle>
        <User size={18} /> Informações pessoais
      </PanelTitle>
      <Section>
        <AvatarRow>
          <Avatar>
            {pfpUrl ? (
              <img src={pfpUrl} alt="avatar" />
            ) : (
              (user?.fullname?.[0]?.toUpperCase() ?? "U")
            )}
          </Avatar>
          <AvatarInfo>
            <AvatarLabel>Foto de perfil</AvatarLabel>
            <AvatarHint>JPG, PNG. Recomendado 256×256px.</AvatarHint>
            <Button
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              style={{ marginTop: 8 }}
            >
              Alterar foto
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </AvatarInfo>
        </AvatarRow>

        <Field>
          <FieldLabel>NOME COMPLETO</FieldLabel>
          <StyledInput
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Seu nome completo"
          />
        </Field>

        <Field>
          <FieldLabel>TIPO DE CONTA</FieldLabel>
          <div>
            <Chip>Conta Pessoal</Chip>
          </div>
        </Field>

        <FormActions>
          <Button
            loading={loading}
            onClick={handleSave}
            disabled={!fullname.trim()}
          >
            Salvar alterações
          </Button>
        </FormActions>
      </Section>
    </>
  );
};
