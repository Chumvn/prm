# Faceswap Batch Processing

> Generate a batch faceswap pipeline for processing multiple images with consistent quality.

## Batch Size

{{batch_size|
Nhỏ (5-10 ảnh):small_5_to_10,
Vừa (10-50 ảnh):medium_10_to_50,
Lớn (50-200 ảnh):large_50_to_200,
Hàng loạt (200+ ảnh):bulk_200_plus
}}

## Source Face Count

{{source_faces|
1 khuôn mặt:single_face,
2 khuôn mặt:dual_face,
Nhiều khuôn mặt (3+):multi_face_3_plus
}}

## Consistency Mode

{{consistency|
Strict — tất cả giống nhau:strict_uniform,
Adaptive — tùy theo ảnh:adaptive_per_image,
Template — theo mẫu đã chọn:template_locked
}}

## Error Handling

{{error_handling|
Bỏ qua ảnh lỗi:skip_failed,
Dừng lại khi lỗi:stop_on_error,
Đánh dấu để sửa sau:flag_for_review
}}

## Output Format

{{output_format|
PNG chất lượng cao:png_high_quality,
JPEG nén vừa:jpeg_medium_compression,
WebP tối ưu web:webp_optimized,
Giữ định dạng gốc:keep_original_format
}}

## Naming Convention

{{naming|
Giữ tên gốc + hậu tố:original_name_suffix,
Đánh số thứ tự:sequential_numbering,
Tên gốc + timestamp:original_name_timestamp
}}

---

## Prompt Output

Execute batch faceswap processing pipeline.

Batch size: {{batch_size}}
Source faces: {{source_faces}}
Consistency mode: {{consistency}}
Error handling: {{error_handling}}
Output format: {{output_format}}
Naming convention: {{naming}}

### Batch Processing Strict Rules

1. Face identity MUST remain identical across ALL images in the batch — zero drift
2. Color calibration MUST normalize source face lighting before each swap
3. Failed detections MUST be handled per the specified error handling policy
4. Output file naming MUST follow the specified convention exactly
5. Processing order MUST be deterministic — same input same output every time
6. Quality MUST NOT degrade as batch size increases — no memory leak shortcuts
7. Each output image MUST pass automated QA: face detection confidence > 95%
8. Generate a summary report: total processed, success count, failed count, avg confidence
9. Preserve EXIF metadata from source images (minus face data for privacy)
10. Support resume from checkpoint if batch is interrupted
