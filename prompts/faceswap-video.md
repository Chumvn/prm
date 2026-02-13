# Faceswap Video Frame

> Generate faceswap instructions for video frame-by-frame processing with temporal consistency.

## Video Type

{{video_type|
Quay selfie:selfie_video,
Phỏng vấn / nói chuyện:talking_head,
MV / quay nghệ thuật:music_video_artistic,
Clip TikTok ngắn:short_form_tiktok
}}

## Motion Complexity

{{motion_level|
Đứng yên / ít cử động:static_minimal,
Cử động nhẹ (gật, quay):moderate_head_movement,
Cử động mạnh (nhảy, chạy):dynamic_full_body,
Biểu cảm phức tạp (hát, cười lớn):complex_expressions
}}

## Frame Rate

{{frame_rate|
24fps Điện ảnh:24fps_cinematic,
30fps Chuẩn:30fps_standard,
60fps Mượt:60fps_smooth
}}

## Face Blending Mode

{{blend_mode|
Tự động AI:auto_ai_blend,
Mềm mại Gaussian:gaussian_soft,
Poisson seamless:poisson_seamless,
Feather edge:feather_edge_blend
}}

## Output Quality

{{output_quality|
Nhanh / xem trước:fast_preview,
Cân bằng tốc độ-chất lượng:balanced,
Chất lượng cao nhất:maximum_quality
}}

---

## Prompt Output

Perform frame-by-frame faceswap on a {{video_type}} video.

Motion complexity: {{motion_level}}
Target frame rate: {{frame_rate}}
Blending mode: {{blend_mode}}
Output quality: {{output_quality}}

### Temporal Consistency Rules (STRICT)

1. Face identity MUST remain 100% consistent across ALL frames — no flickering
2. Skin tone MUST NOT shift between frames — use reference color anchoring
3. Facial landmarks tracking must maintain sub-pixel accuracy during motion
4. Blending boundary MUST be invisible even during fast head rotation
5. Mouth interior (teeth, tongue) MUST render correctly during speech
6. Eye tracking and blink timing MUST match the original footage exactly
7. Shadow casting on the face MUST follow the scene lighting per frame
8. No temporal jitter on hair boundary — use motion-compensated blending
9. Audio sync markers must align with lip movement after swap
10. Export with original audio track preserved, no re-encoding artifacts
