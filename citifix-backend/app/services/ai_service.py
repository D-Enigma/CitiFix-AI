from pathlib import Path

from ultralytics import YOLO


# ---------------------------------------------------------
# Model paths
# ---------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

POTHOLE_MODEL_PATH = BASE_DIR / "models" / "pothole_best.pt"
GARBAGE_MODEL_PATH = BASE_DIR / "models" / "garbage_best.pt"
WATERLOGGING_MODEL_PATH = BASE_DIR / "models" / "waterlogging_best.pt"


# ---------------------------------------------------------
# Load trained models
# ---------------------------------------------------------

pothole_model = YOLO(str(POTHOLE_MODEL_PATH))
garbage_model = YOLO(str(GARBAGE_MODEL_PATH))
waterlogging_model = YOLO(str(WATERLOGGING_MODEL_PATH))


# ---------------------------------------------------------
# AI Image Analysis
# ---------------------------------------------------------

def analyze_image(image_path: str):
    """
    Analyze a civic-issue image using the trained YOLO models.

    Returns:
        {
            "issue_type": str,
            "confidence": float | None
        }
    """

    models = {
        "Pothole": pothole_model,
        "Garbage Accumulation": garbage_model,
        "Waterlogging": waterlogging_model,
    }

    best_issue = "Pending"
    best_confidence = 0.0

    for issue_type, model in models.items():

        results = model.predict(
            source=image_path,
            verbose=False
        )

        for result in results:

            # Object detection model
            if result.boxes is not None and len(result.boxes) > 0:

                confidences = result.boxes.conf.tolist()

                if confidences:

                    confidence = max(confidences)

                    if confidence > best_confidence:
                        best_confidence = confidence
                        best_issue = issue_type

            # Classification model
            elif result.probs is not None:

                confidence = float(result.probs.top1conf)

                if confidence > best_confidence:
                    best_confidence = confidence
                    best_issue = issue_type

    if best_issue == "Pending":
        return {
            "issue_type": "Pending",
            "confidence": None,
        }

    return {
        "issue_type": best_issue,
        "confidence": round(best_confidence, 4),
    }