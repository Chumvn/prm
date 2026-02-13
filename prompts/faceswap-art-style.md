# Faceswap AI Art Style

> Generate a stylized faceswap that blends face identity into artistic visual styles.

## Art Style

{{art_style|
Anime / Manga:anime_manga,
Tranh sơn dầu cổ điển:classic_oil_painting,
Pop Art:pop_art_warhol,
3D Pixar / Disney:3d_pixar_disney,
Cyberpunk neon:cyberpunk_neon,
Thuỷ mặc Á Đông:asian_ink_wash,
Pixel art retro:pixel_art_retro,
Siêu thực Salvador Dali:surrealism_dali
}}

## Face Preservation Level

{{face_fidelity|
Giữ nguyên 100%:exact_identity_100,
Giữ 80% + hòa phong cách:identity_80_stylized,
Giữ 50% + art style mạnh:identity_50_heavy_style,
Chỉ giữ đặc điểm chính:key_features_only
}}

## Background Treatment

{{background|
Giữ nguyên ảnh gốc:keep_original,
Tạo background theo style:generate_matching_style,
Xóa nền / trong suốt:transparent_cutout,
Gradient đơn sắc:solid_gradient
}}

## Color Palette

{{color_palette|
Màu gốc tự nhiên:original_natural,
Pastel nhẹ nhàng:soft_pastel,
Neon rực rỡ:vibrant_neon,
Đơn sắc / Monochrome:monochrome,
Vintage ấm:warm_vintage_tones
}}

## Composition

{{composition|
Chân dung cận mặt:close_up_portrait,
Nửa người:half_body,
Toàn thân:full_body,
Avatar tròn / icon:circular_avatar_icon
}}

---

## Prompt Output

Create a {{art_style}} style faceswap artwork.

Face preservation: {{face_fidelity}}
Background: {{background}}
Color palette: {{color_palette}}
Composition: {{composition}}

### Strict Artistic Rules

1. The swapped face MUST be recognizable as the source identity at the specified fidelity level
2. Art style MUST be applied uniformly — face and body must share the same visual language
3. No half-realistic half-stylized uncanny output — commit fully to the chosen style
4. Color palette MUST remain cohesive across face, clothing, and background
5. Facial proportions may be stylized (e.g. larger eyes for anime) but MUST retain identity markers
6. Line work, brush strokes, or render style MUST be consistent across the entire image
7. Lighting and shading MUST follow the conventions of the chosen art style
8. Output must look like intentional art — not a glitched filter or bad Photoshop
