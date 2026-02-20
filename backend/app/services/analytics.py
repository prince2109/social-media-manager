import pandas as pd

def extract_insights(posts):
    df = pd.DataFrame(posts)

    best_time = df.groupby("hour")["engagement"].mean().idxmax()
    best_type = df.groupby("content_type")["engagement"].mean().idxmax()

    return {
        "best_posting_hour": int(best_time),
        "best_content_type": best_type
    }
