export default function timeAgo(targetDate: string | Date): {
  value: number;
  unit: string;
} {
  const now = new Date();
  let target: Date;
  if (typeof targetDate !== "string") {
    throw new Error();
  }
  targetDate = targetDate.replace(" ", "T");
  target = new Date(targetDate);
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000); // 초 단위 차이
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMinutes < 60) {
    return {
      value: diffInMinutes <= 0 ? 1 : diffInMinutes,
      unit: diffInMinutes > 1 ? "mins" : "min",
    };
  } else if (diffInHours < 24) {
    return { value: diffInHours, unit: diffInHours > 1 ? "hours" : "hour" };
  } else if (diffInDays < 30) {
    return { value: diffInDays, unit: diffInDays > 1 ? "days" : "day" };
  } else if (diffInMonths <= 12) {
    return { value: diffInMonths, unit: diffInMonths > 1 ? "months" : "month" };
  } else {
    return {
      value: diffInMonths % 12,
      unit: diffInMonths % 12 > 1 ? "years" : "year",
    };
  }
}
