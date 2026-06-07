import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type GscContent = {
  type?: string;
  submitted?: string;
  indexed?: string;
};

type GscStatus = {
  path?: string;
  lastSubmitted?: string;
  lastDownloaded?: string;
  isPending?: boolean;
  isSitemapsIndex?: boolean;
  type?: string;
  errors?: string;
  warnings?: string;
  contents?: GscContent[];
};

type Result = {
  siteUrl: string;
  sitemap: string;
  submitted: boolean;
  submitError: string | null;
  status: GscStatus | null;
  statusError: string | null;
};

const AdminSitemapStatus = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("gsc-sitemap-status", {
        method: "POST",
      });
      if (error) throw error;
      setResult(data as Result);
      if ((data as Result).submitted) {
        toast({ title: "Sitemap resubmitted", description: "Google Search Console accepted the request." });
      } else {
        toast({
          title: "Submission warning",
          description: (data as Result).submitError ?? "Could not submit sitemap.",
          variant: "destructive",
        });
      }
    } catch (e) {
      toast({
        title: "Request failed",
        description: (e as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const s = result?.status;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Sitemap Status</h1>
            <p className="text-muted-foreground mt-2">
              Resubmit <code>sitemap-index.xml</code> to Google Search Console and read back the latest indexing status.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Google Search Console</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={checkStatus} disabled={loading} size="lg">
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking…</>
                ) : (
                  <><RefreshCw className="mr-2 h-4 w-4" /> Check sitemap status</>
                )}
              </Button>

              {result && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    {result.submitted ? (
                      <Badge className="gap-1"><CheckCircle2 className="h-3 w-3" /> Submitted</Badge>
                    ) : (
                      <Badge variant="destructive" className="gap-1"><AlertCircle className="h-3 w-3" /> Submit failed</Badge>
                    )}
                    <span className="text-sm text-muted-foreground break-all">{result.sitemap}</span>
                  </div>

                  {s ? (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div><dt className="text-muted-foreground">Last submitted</dt><dd className="font-medium">{s.lastSubmitted ?? "—"}</dd></div>
                      <div><dt className="text-muted-foreground">Last downloaded</dt><dd className="font-medium">{s.lastDownloaded ?? "—"}</dd></div>
                      <div><dt className="text-muted-foreground">Type</dt><dd className="font-medium">{s.type ?? "—"}</dd></div>
                      <div><dt className="text-muted-foreground">Pending</dt><dd className="font-medium">{String(s.isPending ?? false)}</dd></div>
                      <div><dt className="text-muted-foreground">Errors</dt><dd className="font-medium">{s.errors ?? "0"}</dd></div>
                      <div><dt className="text-muted-foreground">Warnings</dt><dd className="font-medium">{s.warnings ?? "0"}</dd></div>
                    </dl>
                  ) : (
                    <p className="text-sm text-destructive">{result.statusError ?? "No status returned."}</p>
                  )}

                  {s?.contents && s.contents.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Contents</h3>
                      <ul className="text-sm space-y-1">
                        {s.contents.map((c, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="text-muted-foreground w-24">{c.type ?? "url"}</span>
                            <span>submitted: {c.submitted ?? "—"}</span>
                            <span>indexed: {c.indexed ?? "—"}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminSitemapStatus;