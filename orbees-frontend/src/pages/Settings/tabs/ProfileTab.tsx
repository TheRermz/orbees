import { useState, useRef, useEffect } from "react";
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
import { useAuthActions } from "../../../contexts/useAuthContext";

export const ProfileTab = () => {
  const { user } = useAuthState();
  const { refreshUser } = useAuthActions();
  const { updateMe, updateProfilePicture, loading } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fullname, setFullname] = useState(user?.fullname ?? "");
  const [pendingPhoto, setPendingPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const pfp = user?.profilePicturePath?.replace("-", "");
  const pfpUrl = previewUrl
    ?? (pfp ? `${import.meta.env.VITE_API_BASE_URL?.replace("/api", "")}${pfp}` : null);

  const handleSave = async () => {
    if (pendingPhoto) {
      const photoError = await updateProfilePicture(pendingPhoto);
      if (photoError) {
        showToast("error", photoError);
        return;
      }
      setPendingPhoto(null);
      setPreviewUrl(null);
    }
    const errorMsg = await updateMe({ fullname });
    if (!errorMsg) window.location.reload();
    else showToast("error", errorMsg);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPendingPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
    e.target.value = "";
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
