import threeDS from "../assets/file-type-icons/3ds.svg";
import ai from "../assets/file-type-icons/ai.svg";
import app from "../assets/file-type-icons/app.svg";
import asp from "../assets/file-type-icons/asp.svg";
import bat from "../assets/file-type-icons/bat.svg";
import cSharp from "../assets/file-type-icons/cSharp.svg";
import cPlus from "../assets/file-type-icons/cPlus.svg";
import css from "../assets/file-type-icons/css.svg";
import csv from "../assets/file-type-icons/csv.svg";
import dat from "../assets/file-type-icons/dat.svg";
import dll from "../assets/file-type-icons/dll.svg";
import doc from "../assets/file-type-icons/doc.svg";
import docx from "../assets/file-type-icons/docx.svg";
import dwg from "../assets/file-type-icons/dwg.svg";
import eml from "../assets/file-type-icons/eml.svg";
import eps from "../assets/file-type-icons/eps.svg";
import exe from "../assets/file-type-icons/exe.svg";
import flv from "../assets/file-type-icons/flv.svg";
import gif from "../assets/file-type-icons/gif.svg";
import html from "../assets/file-type-icons/html.svg";
import ics from "../assets/file-type-icons/ics.svg";
import iso from "../assets/file-type-icons/iso.svg";
import jar from "../assets/file-type-icons/jar.svg";
import jpeg from "../assets/file-type-icons/jpeg.svg";
import jpg from "../assets/file-type-icons/jpg.svg";
import js from "../assets/file-type-icons/js.svg";
import log from "../assets/file-type-icons/log.svg";
import mdb from "../assets/file-type-icons/mdb.svg";
import mov from "../assets/file-type-icons/mov.svg";
import mp3 from "../assets/file-type-icons/mp3.svg";
import mp4 from "../assets/file-type-icons/mp4.svg";
import obj from "../assets/file-type-icons/obj.svg";
import otf from "../assets/file-type-icons/otf.svg";
import pdf from "../assets/file-type-icons/pdf.svg";
import php from "../assets/file-type-icons/php.svg";
import png from "../assets/file-type-icons/png.svg";
import ppt from "../assets/file-type-icons/ppt.svg";
import psd from "../assets/file-type-icons/psd.svg";
import pub from "../assets/file-type-icons/pub.svg";
import rar from "../assets/file-type-icons/rar.svg";
import sql from "../assets/file-type-icons/sql.svg";
import srt from "../assets/file-type-icons/srt.svg";
import svg from "../assets/file-type-icons/svg.svg";
import ttf from "../assets/file-type-icons/ttf.svg";
import txt from "../assets/file-type-icons/txt.svg";
import wav from "../assets/file-type-icons/wav.svg";
import xls from "../assets/file-type-icons/xls.svg";
import xlsx from "../assets/file-type-icons/xlsx.svg";
import xml from "../assets/file-type-icons/xml.svg";
import zip from "../assets/file-type-icons/zip.svg";

const types: any = {
  threeDS,
  ai,
  app,
  asp,
  bat,
  cSharp,
  cPlus,
  css,
  csv,
  dat,
  dll,
  doc,
  docx,
  dwg,
  eml,
  eps,
  exe,
  flv,
  gif,
  html,
  ics,
  iso,
  jar,
  jpeg,
  jpg,
  js,
  log,
  mdb,
  mov,
  mp3,
  mp4,
  obj,
  otf,
  pdf,
  php,
  png,
  ppt,
  psd,
  pub,
  rar,
  sql,
  srt,
  svg,
  ttf,
  txt,
  wav,
  xls,
  xlsx,
  xml,
  zip,
};

function getFileIcon(type: string) {
  if (types[type]) {
    return types[type];
  }
  return doc;
}

export default getFileIcon;
