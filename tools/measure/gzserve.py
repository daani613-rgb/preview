"""Static server that gzips text responses when the client accepts it, as GitHub Pages does (measurement only)."""
import http.server, gzip, os, sys
TEXT = ('.html', '.js', '.css', '.json', '.svg', '.txt', '.md')
class H(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path): path = os.path.join(path, 'index.html')
        if path.endswith(TEXT) and os.path.exists(path) and 'gzip' in self.headers.get('Accept-Encoding', ''):
            body = gzip.compress(open(path, 'rb').read(), 6)
            self.send_response(200); self.send_header('Content-Type', self.guess_type(path)); self.send_header('Content-Encoding', 'gzip')
            self.send_header('Content-Length', str(len(body))); self.end_headers()
            import io; return io.BytesIO(body)
        return super().send_head()
    def log_message(self, *a): pass
os.chdir(sys.argv[2]); http.server.ThreadingHTTPServer(('127.0.0.1', int(sys.argv[1])), H).serve_forever()
