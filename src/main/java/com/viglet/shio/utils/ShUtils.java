/*
 * Copyright (C) 2016-2020 the original author or authors. 
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
package com.viglet.shio.utils;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Collection;

import org.apache.commons.compress.archivers.ArchiveException;
import org.apache.commons.compress.archivers.ArchiveOutputStream;
import org.apache.commons.compress.archivers.ArchiveStreamFactory;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveInputStream;
import org.apache.commons.compress.utils.IOUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.viglet.shio.api.ShJsonView.ShJsonViewGenericType;

/**
 * @author Alexandre Oliveira
 */
@Component
public class ShUtils {
	private static final Log logger = LogFactory.getLog(ShUtils.class);

	public static String asJsonString(final Object obj) throws ShUtilsException {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new ShUtilsException(e);
		}
	}

	public static String asJsonStringAndView(final Object obj, Class<? extends ShJsonViewGenericType> clazz)
			throws ShUtilsException {
		try {
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
			return mapper.writerWithView(clazz).writeValueAsString(obj);
		} catch (Exception e) {
			throw new ShUtilsException(e);
		}
	}

	public boolean isJSONValid(String json) {
		if (StringUtils.isBlank(json) || json == null) {
			return false;
		} else {
			try {
				new JSONObject(json);
			} catch (JSONException ex) {
				try {
					new JSONArray(json);
				} catch (JSONException ex1) {
					return false;
				}
			}
		}
		return true;
	}
}
