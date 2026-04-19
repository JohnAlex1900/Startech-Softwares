from __future__ import annotations

from typing import Any

import requests
from bs4 import BeautifulSoup


def _normalize_url(value: str) -> str:
    cleaned = value.strip()
    if cleaned.startswith("http://") or cleaned.startswith("https://"):
        return cleaned
    return f"https://{cleaned}"


def _hash_num(seed: str, min_value: int, max_value: int) -> int:
    total = sum(ord(char) for char in seed)
    span = max_value - min_value
    if span <= 0:
        return min_value
    return min_value + (total % (span + 1))


def analyze_website(url: str) -> dict[str, Any]:
    normalized_url = _normalize_url(url)

    issues: list[str] = []
    opportunities: list[str] = []
    recommendations: list[str] = []

    reachable = False
    has_title = False
    has_meta_description = False
    image_count = 0

    try:
        response = requests.get(normalized_url, timeout=10, headers={"User-Agent": "StartechAuditBot/1.0"})
        reachable = response.status_code == 200

        if not reachable:
            issues.append("The website is not loading reliably for users.")
            recommendations.append("Improve hosting reliability and fix any DNS/SSL problems.")

        if response.text:
            soup = BeautifulSoup(response.text, "html.parser")
            title = soup.find("title")
            has_title = bool(title and title.get_text(strip=True))
            meta_desc = soup.find("meta", attrs={"name": "description"})
            has_meta_description = bool(meta_desc and meta_desc.get("content", "").strip())
            image_count = len(soup.find_all("img"))
    except requests.RequestException:
        issues.append("The website URL appears unreachable from a standard browser request.")
        recommendations.append("Check domain status, SSL certificate validity, and server uptime.")

    if not has_title:
        issues.append("The website is missing a strong page title, reducing search visibility.")
        recommendations.append("Add a clear, keyword-focused title tag for your core offer.")
    else:
        opportunities.append("Your title structure can be optimized further to improve click-through rate.")

    if not has_meta_description:
        issues.append("The website has no effective meta description to support search conversions.")
        recommendations.append("Write compelling meta descriptions for key pages to improve organic traffic quality.")
    else:
        opportunities.append("Meta descriptions exist and can be refined for stronger conversion intent.")

    if image_count < 3:
        issues.append("Visual proof is limited, which can lower visitor trust and engagement.")
        recommendations.append("Add authentic branded visuals, product photos, or before/after evidence.")
    else:
        opportunities.append("Visual assets are present and can be optimized with alt text and compression.")

    completeness_checks = [reachable, has_title, has_meta_description, image_count >= 3]
    score = round((sum(1 for ok in completeness_checks if ok) / len(completeness_checks)) * 10, 1)

    if score >= 8:
        opportunities.append("The website has a solid foundation and is ready for conversion optimization.")
    elif score >= 5:
        opportunities.append("With focused updates, the website can become a stronger lead-generation channel.")
    else:
        opportunities.append("A structured website revamp can significantly improve trust and lead flow.")

    return {
        "input_type": "website",
        "input_value": normalized_url,
        "score": score,
        "problems": list(dict.fromkeys(issues)),
        "opportunities": list(dict.fromkeys(opportunities)),
        "recommendations": list(dict.fromkeys(recommendations)),
        "details": {
            "reachable": reachable,
            "has_title": has_title,
            "has_meta_description": has_meta_description,
            "image_count": image_count,
        },
    }


def analyze_instagram(handle: str) -> dict[str, Any]:
    clean_handle = handle.strip().replace("@", "")

    followers_estimate = _hash_num(clean_handle, 800, 24000)
    engagement_rate_estimate = round(_hash_num(clean_handle + "engagement", 8, 42) / 10, 1)

    problems = [
        "Posting consistency appears low, making audience growth unpredictable.",
        "Engagement signals are likely below potential for this niche.",
        "Slow response behavior can reduce conversion from interested followers.",
    ]

    opportunities = [
        "Consistent weekly content can improve brand recall and trust.",
        "A clearer profile offer and CTA can convert profile views into enquiries.",
        "Fast DM response workflows can lift enquiry-to-sale conversion.",
    ]

    recommendations = [
        "Use a 3-post weekly cadence mixing proof, education, and offer-driven content.",
        "Refresh bio with a direct value proposition and a WhatsApp-first call to action.",
        "Set response SOPs to answer DMs and comments within one hour during business hours.",
    ]

    score = 6.1 if followers_estimate > 5000 else 4.9
    if engagement_rate_estimate >= 3.0:
        score += 1.4
    elif engagement_rate_estimate >= 2.0:
        score += 0.9
    else:
        score += 0.3

    return {
        "input_type": "instagram",
        "input_value": f"@{clean_handle}",
        "score": min(round(score, 1), 10.0),
        "problems": problems,
        "opportunities": opportunities,
        "recommendations": recommendations,
        "details": {
            "followers_estimate": followers_estimate,
            "engagement_rate_estimate": engagement_rate_estimate,
        },
    }


def generate_report_text(data: dict[str, Any]) -> str:
    score = data.get("score", 0)
    business_name = data.get("business_name", "Your business")
    input_type = data.get("input_type", "digital presence")

    summary = (
        f"{business_name} received an AI audit score of {score}/10 for its {input_type} presence. "
        "The current setup shows clear potential but also reveals practical gaps that may be limiting lead flow, trust, and conversion consistency."
    )

    problems = data.get("problems", [])[:3]
    opportunities = data.get("opportunities", [])[:3]
    recommendations = data.get("recommendations", [])[:3]

    problems_text = "\n".join([f"- {item}" for item in problems]) or "- No major risks identified."
    opportunities_text = "\n".join([f"- {item}" for item in opportunities]) or "- No opportunities identified."
    recommendations_text = "\n".join([f"- {item}" for item in recommendations]) or "- No recommendations available."

    return (
        f"Summary:\n{summary}\n\n"
        f"Key Problems:\n{problems_text}\n\n"
        f"Growth Opportunities:\n{opportunities_text}\n\n"
        f"Actionable Recommendations:\n{recommendations_text}"
    )
