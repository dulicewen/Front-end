module.exports = "\n@export ecgl.displayShadow.vertex\n\n@import ecgl.common.transformUniforms\n\n@import ecgl.common.uv.header\n\n@import ecgl.common.attributes\n\nvarying vec3 v_WorldPosition;\n\nvarying vec3 v_Normal;\n\nvoid main()\n{\n @import ecgl.common.uv.main\n v_Normal = normalize((worldInverseTranspose * vec4(normal, 0.0)).xyz);\n \n v_WorldPosition = (world * vec4(position, 1.0)).xyz;\n gl_Position = worldViewProjection * vec4(position, 1.0);\n}\n\n@end\n\n\n@export ecgl.displayShadow.fragment\n\n@import ecgl.common.uv.fragmentHeader\n\nvarying vec3 v_Normal;\nvarying vec3 v_WorldPosition;\n\nuniform float roughness: 0.2;\n\n#ifdef DIRECTIONAL_LIGHT_COUNT\n@import qtek.header.directional_light\n#endif\n\n@import ecgl.common.ssaoMap.header\n\n@import qtek.plugin.compute_shadow_map\n\nvoid main()\n{\n float shadow = 1.0;\n\n @import ecgl.common.ssaoMap.main\n\n#if defined(DIRECTIONAL_LIGHT_COUNT) && defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)\n float shadowContribsDir[DIRECTIONAL_LIGHT_COUNT];\n if(shadowEnabled)\n {\n computeShadowOfDirectionalLights(v_WorldPosition, shadowContribsDir);\n }\n for (int i = 0; i < DIRECTIONAL_LIGHT_COUNT; i++) {\n shadow = min(shadow, shadowContribsDir[i] * 0.5 + 0.5);\n }\n#endif\n\n shadow *= 0.5 + ao * 0.5;\n shadow = clamp(shadow, 0.0, 1.0);\n\n gl_FragColor = vec4(vec3(0.0), 1.0 - shadow);\n}\n\n@end";
