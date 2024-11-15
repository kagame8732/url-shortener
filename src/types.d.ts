interface Column {
  id:
    | "id"
    | "url"
    | "ttlInSeconds"
    | "createdDate"
    | "modifiedDate"
    | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

interface TableData {
  id: string;
  url: string;
  ttlInSeconds: number;
  createdDate: string;
  modifiedDate: string;
}

interface ShortenedUrl {
  id: string;
  url: string;
  ttlInSeconds: number;
  createdDate: string;
  modifiedDate: string;
  actions?: string
}
