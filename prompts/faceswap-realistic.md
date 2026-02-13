# Faceswap Photo Realistic

> Generate a hyper-realistic faceswap image with precise facial feature mapping.

## Source Configuration

{{swap_type|
Chân dung 1 người:single_portrait,
Nhóm nhiều người:group_photo,
Ảnh cũ phục chế:vintage_restoration,
Ảnh thẻ / ID:id_photo
}}

## Target Style

{{target_style|
Tự nhiên như thật:photorealistic,
Phim điện ảnh:cinematic,
Tạp chí thời trang:fashion_editorial,
Ảnh studio chuyên nghiệp:professional_studio
}}

## Lighting Condition

{{lighting|
Ánh sáng tự nhiên:natural_daylight,
Studio softbox:studio_softbox,
Hoàng hôn ấm áp:golden_hour,
Ánh sáng dramatic:dramatic_rembrandt
}}

## Skin Detail Level

{{skin_detail|
Siêu chi tiết (lỗ chân lông):ultra_detailed_pores,
Mịn tự nhiên:natural_smooth,
Làm đẹp nhẹ:light_beauty_retouch,
Raw không chỉnh:raw_unretouched
}}

## Resolution

{{resolution|
HD 1024x1024:1024x1024,
Full HD 1920x1080:1920x1080,
4K 3840x2160:4k_3840x2160,
Vuông 1:1:square_1to1
}}

## Expression

{{expression|
Tự nhiên thoải mái:natural_relaxed,
Cười nhẹ:subtle_smile,
Nghiêm túc:serious_confident,
Vui vẻ rạng rỡ:joyful_bright
}}

---

## Prompt Output

Perform a high-quality faceswap operation.

Swap type: {{swap_type}}
Target style: {{target_style}}
Lighting: {{lighting}}
Skin detail: {{skin_detail}}
Output resolution: {{resolution}}
Expression: {{expression}}

### Strict Requirements

1. Facial geometry MUST match the target head pose exactly — pitch, yaw, roll
2. Skin tone blending MUST seamlessly match the target body and neck area
3. Lighting direction on the swapped face MUST align with the scene lighting
4. Eye gaze direction MUST remain consistent with the original composition
5. Hair boundary and ear occlusion MUST blend naturally with zero hard edges
6. No warping, no uncanny valley artifacts, no color mismatch at jaw line
7. Preserve original background, clothing, and accessories untouched
8. Output must be indistinguishable from a real unedited photograph
