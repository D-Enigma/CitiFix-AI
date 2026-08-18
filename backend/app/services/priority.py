def calculate_priority(confidence):

    if confidence is None:
        return "Pending", "Pending"

    if confidence >= 0.85:
        return "High", "High"

    if confidence >= 0.65:
        return "Medium", "Medium"

    return "Low", "Low"