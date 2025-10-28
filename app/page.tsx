"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { getData, postData } from "../lib/apiMethods";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { Link2, Copy, ExternalLink, Sparkles, Zap, Shield, Check } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shareUrl,setShareUrl]=useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
   const [copied, setCopied] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const SortUrl = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      toast.error("URL must include http:// or https://");
      return;
    }

    try {
      setLoading(true);
      const data = await postData("/links", { originalUrl: url });
      const fullShortUrl = `${baseUrl}/${data?.link?.shortId || data?.shortId}`;
      const redirectUrl=data?.link?.shortId || data?.shortId;
      setShareUrl(fullShortUrl);
      setShortUrl(redirectUrl);
      setOriginalUrl(url);
      setShowModal(true);
      toast.success("Short link created successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
     setCopied(true);
    toast.success("Short link copied!");
  };
  //  const handleRedirect = async (shortId: string) => {
  //   try {
  //     const { originalUrl } = await getData(`/${shortId}`);
  //     if (!originalUrl) {
  //       toast.error("Original link not found");
  //       return;
  //     }
  //     // window.open(originalUrl, "_blank"); 
  //     toast.success("Redirecting...");
  //   } catch (error: any) {
  //     toast.error(error.response?.data?.message || "Redirect failed");
  //   }
  // };
  const handleRedirect = (shortId: string) => {
  const href = `${baseUrl}/${shortId}`;
  window.open(href, "_blank", "noopener,noreferrer");
  toast.success("Redirecting...");
};
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-sky-400 via-sky-300 to-white p-3 rounded-2xl shadow-lg">
              <Link2 className="w-10 h-10 text-white" />
            </div>
          </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-sky-400 to-sky-300 mb-4">
            Shorten Your URLs
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform long, complex URLs into short, memorable links in seconds. Track, manage, and share with ease.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 mb-16 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your long URL here..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200"
                onKeyPress={(e) => e.key === "Enter" && SortUrl()}
              />
            </div>
          <button
  onClick={SortUrl}
  disabled={loading}
  className="px-8 py-4 bg-gradient-to-r from-blue-900 to-sky-400 text-black text-lg font-semibold rounded-xl hover:from-blue-800 hover:to-sky-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 min-w-[140px]"
>
  {loading ? (
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
  ) : (
    <>
      <Zap className="w-5 h-5 text-black" />
      <span>Shorten</span>
    </>
  )}
</button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Generate short links instantly with our optimized infrastructure.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">Your links are protected with enterprise-grade security.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100">
            <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Track & Analyze</h3>
            <p className="text-gray-600">Monitor clicks and performance with detailed analytics.</p>
          </div>
        </div>
      </div>
     {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
      <div className="bg-gradient-to-r from-blue-900 to-sky-400 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Check className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">Link Created Successfully!</h2>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Original URL</label>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-sm text-gray-600 break-all">{originalUrl}</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Short URL</label>
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg p-4 border-2 border-sky-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleRedirect(shortUrl)}
                className="text-sky-700 font-semibold hover:text-sky-800 flex items-center space-x-2 flex-1 text-left"
              >
                <span className="truncate">{shortUrl}</span>
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>

          <button
            onClick={() => setShowModal(false)}
            className="flex-1 bg-gradient-to-r from-blue-900 to-sky-400 hover:from-blue-800 hover:to-sky-500 text-black font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Done
          </button>
        </div>
        <div className="border-t pt-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">Share via</p>
          <div className="flex gap-3 justify-center">
            <WhatsappShareButton url={shareUrl} title="Check this link!">
              <WhatsappIcon size={44} round className="hover:scale-110 transition-transform duration-200" />
            </WhatsappShareButton>
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={44} round className="hover:scale-110 transition-transform duration-200" />
            </FacebookShareButton>
            <TelegramShareButton url={shareUrl}>
              <TelegramIcon size={44} round className="hover:scale-110 transition-transform duration-200" />
            </TelegramShareButton>
            <EmailShareButton url={shareUrl} subject="Check out this link">
              <EmailIcon size={44} round className="hover:scale-110 transition-transform duration-200" />
            </EmailShareButton>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

    </main>
  );
}
