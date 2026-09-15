import type {
  GitHubContributionLevel,
  GitHubContributionWeek,
} from "../types/github";

export const CONTRIBUTION_LEVEL_COLORS: Record<GitHubContributionLevel, string> =
  {
    NONE: "rgba(255, 255, 255, 0.05)",
    FIRST_QUARTILE: "rgba(199, 112, 199, 0.22)",
    SECOND_QUARTILE: "rgba(199, 112, 199, 0.42)",
    THIRD_QUARTILE: "rgba(199, 112, 199, 0.65)",
    FOURTH_QUARTILE: "#d47fd4",
  };

export function formatContributionDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatContributionTooltip(
  count: number,
  date: string
): string {
  const formattedDate = formatContributionDate(date);

  if (count === 0) {
    return `No contributions on ${formattedDate}`;
  }

  if (count === 1) {
    return `1 contribution on ${formattedDate}`;
  }

  return `${count} contributions on ${formattedDate}`;
}

export function formatContributionTotal(count: number): string {
  if (count === 1) {
    return "1 contribution in the last year";
  }

  return `${count.toLocaleString()} contributions in the last year`;
}

export interface MonthLabel {
  label: string;
  weekIndex: number;
}

export function getMonthLabels(weeks: GitHubContributionWeek[]): MonthLabel[] {
  const labels: MonthLabel[] = [];
  let previousMonth = -1;

  weeks.forEach((week, weekIndex) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;

    const month = new Date(`${firstDay.date}T12:00:00`).getMonth();
    if (month === previousMonth) return;

    previousMonth = month;
    labels.push({
      label: new Date(`${firstDay.date}T12:00:00`).toLocaleDateString(
        "en-US",
        { month: "short" }
      ),
      weekIndex,
    });
  });

  return labels;
}
